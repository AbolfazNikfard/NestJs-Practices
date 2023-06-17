import { Injectable } from '@nestjs/common';
import { insertTranslationDTO, updateTranslationDTO } from './dto/translation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TranslationEntity } from './entities/translation.entity';
import { Repository } from 'typeorm';
import * as md5 from 'md5';
import { paginationDTO } from 'src/dto/pagination.dto';

@Injectable()
export class TranslationService {
  constructor(
    @InjectRepository(TranslationEntity)
    private translationRepository: Repository<TranslationEntity>,
  ) {}
  get(pagination:paginationDTO){
    const {page, limit} = pagination;
    return this.translationRepository.find({
      skip:(page-1)*limit,
      take:limit
    })
  }

  async getTranslationBy(Phrase: string) {
    try {
      const existTranslation = await this.translationRepository.findOneBy({
        id: md5(Phrase),
      });
      if (existTranslation) return existTranslation;
      else return 'translation not found';
    } catch (err) {
      throw new Error(err);
    }
  }

  async insert(translation: insertTranslationDTO) {
    const existTranslation = await this.translationRepository.findOneBy({
      id: md5(translation.phrase),
    });
    if (!existTranslation){
      const newTranslation = new TranslationEntity(translation);
      newTranslation.id = md5(translation.phrase);
      await this.translationRepository.save(newTranslation); 
      return `translation added successfully`
    }else return 'trasnlation already exist';
  }

  async update(updateTranslation: updateTranslationDTO) {
    try {
      return await this.translationRepository.save(updateTranslation);
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete(translationPhrase: string) {
    try {
      const existTrnslation = await this.translationRepository.findOneBy({
        id: md5(translationPhrase),
      });
      if (existTrnslation) {
        await this.translationRepository.remove(existTrnslation);
        return `translation deleted`;
      } else return 'translation not found';
    } catch (err) {
      throw new Error(err);
    }
  }
}
