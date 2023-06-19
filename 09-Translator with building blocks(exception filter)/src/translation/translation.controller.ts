import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { insertTranslationDTO, updateTranslationDTO } from './dto/translation.dto';
import { TranslationService } from './translation.service';
import { paginationDTO } from 'src/dto/pagination.dto';
import { translateRequestDTO } from './dto/translateRequest.dto';
import { NestOpenAiService } from '../nest-open-ai/nest-open-ai.service';

@Controller('translation')
export class TranslationController {
  constructor(private translationService: TranslationService, private openAiSrvice :NestOpenAiService) {}
  @Get()
  get(@Query() pagination:paginationDTO){
      return this.translationService.get(pagination);
  }

  @Get(":phrase")
  getById(@Param("phrase") phrase){
      return this.translationService.getTranslationBy(phrase);
  }

  @Post()
  insert(@Body() translation:insertTranslationDTO){
      return this.translationService.insert(translation);
  }

  @Patch(":phrase")
  update(@Body() translation:updateTranslationDTO){
      return this.translationService.update(translation);
  }

  @Delete(":phrase")
  delete(@Param("phrase") phrase){
      return this.translationService.delete(phrase)
  }
  @Post("/translate")
  translate(@Body() translateRequest:translateRequestDTO){
    return this.openAiSrvice.translate(
        translateRequest.sourceLang,
        translateRequest.targetLang,
        translateRequest.phrase)
  }
}
