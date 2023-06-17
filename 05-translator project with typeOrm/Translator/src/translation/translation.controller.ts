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

@Controller('translation')
export class TranslationController {
  constructor(private translationService: TranslationService) {}
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
}
