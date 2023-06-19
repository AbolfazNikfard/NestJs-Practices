import { Module } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { TranslationController } from './translation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationEntity } from './entities/translation.entity';
import { NestOpenAiModule } from 'src/nest-open-ai/nest-open-ai.module';

@Module({
  imports: [TypeOrmModule.forFeature([TranslationEntity]), NestOpenAiModule],
  controllers: [TranslationController],
  providers: [TranslationService],
  exports: [TypeOrmModule],
})
export class TranslationModule {}
