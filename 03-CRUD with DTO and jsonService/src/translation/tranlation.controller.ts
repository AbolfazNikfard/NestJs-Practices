import {
  Body,
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import {
  TranslationCreatDTO,
  TranslationDeleteDTO,
  TranslationUpdateDTO,
} from './entities/translation.entity';
import { TranslationService } from './translation.service';
import {Response} from 'express';
@Controller('translation')
export class TranslationController {
  constructor(private translationService: TranslationService) {
    console.log('TranslationController instantiated');
  }
  @Get()
  selectAllTranslations(@Res({passthrough: true}) res: Response) {
    try {
      return this.translationService.selectAll();
    } catch (err) {
      console.log('Catched Error : ', err.message);
      res.status(500);
    }
  }
  @Get(':phrase')
  selectTranslation(@Param('phrase') phrase: string) {
    return this.translationService.select(phrase);
  }
  @Post()
  insertTranslation(@Body() translation: TranslationCreatDTO, @Res({passthrough: true}) res: Response) {
    try {
      return this.translationService.insert(translation);
    } catch (err) {
      console.log('Catched Error : ', err.message);
      res.status(500);
    }
  }
  @Put()
  updateTranslation(@Body() translation: TranslationUpdateDTO, @Res({passthrough: true}) res: Response) {
    try {
      return this.translationService.update(translation);
    } catch (err) {
      console.log('Catched Error : ', err.message);
      res.status(500);
    }
  }
  @Delete()
  deleteTranslation(@Body() translation: TranslationDeleteDTO, @Res({passthrough: true}) res: Response) {
    try {
     return this.translationService.delete(translation);
    } catch (err) {
      console.log('Catched Error : ', err.message);
      res.status(500);
    }
  }
}
