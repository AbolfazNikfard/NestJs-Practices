import { Module } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { TranslationController } from './translation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationEntity } from './entities/translation.entity';
import { NestOpenAiModule } from '@AolfazNikfard/nest-open-ai';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'src/logger/logger.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([TranslationEntity]),
    NestOpenAiModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory(configService:ConfigService){
        return configService.get('OPEN_AI_API_KEY');
      }
    }),
    LoggerModule
  ],
  controllers: [TranslationController],
  providers: [TranslationService],
  exports: [TranslationService],
})
export class TranslationModule {}
