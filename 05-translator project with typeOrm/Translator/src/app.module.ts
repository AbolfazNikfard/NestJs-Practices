import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationEntity } from 'src/translation/entities/translation.entity';
import { TranslationService } from './translation/translation.service';
import { TranslationController } from './translation/translation.controller';
import { EventController } from './event/event.controller';
import { UserEntity } from './user/entities/user.entity';
import { EventEntity } from './event/entities/event.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { EventService } from './event/event.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:"postgres",
    host:"localhost",
    port:5432,
    database:"translator",
    username:"postgres",
    password:"postgress",
    synchronize:true,
    autoLoadEntities:true
  }),
  TypeOrmModule.forFeature([TranslationEntity, UserEntity, EventEntity]),
],
  controllers: [AppController,TranslationController, EventController, UserController],
  providers: [AppService, TranslationService, UserService, EventService],
  
})
export class AppModule {}
