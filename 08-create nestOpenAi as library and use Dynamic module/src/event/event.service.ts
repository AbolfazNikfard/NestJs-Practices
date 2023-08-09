import { Injectable, Param } from '@nestjs/common';
import { deleteLikeEventDTO, insertLikeEventDTO } from './dto/event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { TranslationEntity } from 'src/translation/entities/translation.entity';
import * as md5 from 'md5';
import { EventType } from './entities/event.entity';
@Injectable()
export class EventService {
  constructor(
    // @InjectRepository(EventEntity)
    // private eventRepository: Repository<EventEntity>,
    // @InjectRepository(UserEntity)
    // private userRepository: Repository<UserEntity>,
    // @InjectRepository(TranslationEntity)
    // private translationRepository: Repository<TranslationEntity>,
    private dataSource: DataSource,
  ) {}
  async insertLikeEvent(likeEvent: insertLikeEventDTO) {
    try {
      const user = await this.dataSource.manager.findOneBy(UserEntity, {
        username: likeEvent.userName,
      });
      if (!user) 
        return 'user not found';

      const translation = await this.dataSource.manager.findOneBy(
        TranslationEntity,
        { id: md5(likeEvent.translatedPhrase) },
      );
      if (!translation) 
        return 'translation phrase not found';

      const addEventresult = await this.dataSource.manager.transaction(
        async (transactionManager) => {
          
          const alreadyLiked = await transactionManager.findOneBy(EventEntity, {
            userName: likeEvent.userName,
            translatedPhrase: md5(likeEvent.translatedPhrase),
          });
          if (!alreadyLiked) {
            await transactionManager.insert(EventEntity, {
              userName: likeEvent.userName,
              translatedPhrase: md5(likeEvent.translatedPhrase),
              type: EventType.Like,
            });
            translation.likes = translation.likes + 1;
            await transactionManager.save(translation);
            return 'event added';
          } 
          else 
            return 'translation already liked';
        },
      );
      return addEventresult;
    } catch (err) {
      throw new Error(err);
    }
  }
  async deleteLikeEvent(likeEvent:deleteLikeEventDTO){
      const user = await this.dataSource.manager.findOneBy(UserEntity,{
        username:likeEvent.userName
      })
      if(!user)
      return "user not found";

      const translation = await this.dataSource.manager.findOneBy(TranslationEntity,{
        id:md5(likeEvent.translatedPhrase)
      })

      if(!translation)
      return "translation not found";
       const querRunner = this.dataSource.createQueryRunner();
       querRunner.connect();
       querRunner.startTransaction();
       try{
          const event = await querRunner.manager.findOneBy(EventEntity,{
            userName: likeEvent.userName,
            translatedPhrase: md5(likeEvent.translatedPhrase),
          });
          if(!event)
          return "event not found";
           await querRunner.manager.remove(event);

           translation.likes = translation.likes - 1;
           await querRunner.manager.save(translation);

           await querRunner.commitTransaction();
           return "event deleted";
       }
       catch(err){
        await querRunner.rollbackTransaction();
        throw new Error(err);
       }
       finally{
        await querRunner.release();
       }

  }
}
