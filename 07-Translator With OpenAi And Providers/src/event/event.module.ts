import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { TranslationModule } from 'src/translation/translation.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity]),
    TranslationModule,
    UserModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
