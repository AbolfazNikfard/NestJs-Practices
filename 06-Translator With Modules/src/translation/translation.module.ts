import { Module } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { TranslationController } from './translation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationEntity } from './entities/translation.entity';

@Module({
    imports:[TypeOrmModule.forFeature([TranslationEntity])],
    controllers:[TranslationController],
    providers:[TranslationService],
    exports:[TypeOrmModule]
})
export class TranslationModule {}
