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
import {
  insertTranslationDTO,
  updateTranslationDTO,
} from './dto/translation.dto';
import { TranslationService } from './translation.service';
import { paginationDTO } from 'src/shared/dto/pagination.dto';
import { translateRequestDTO } from './dto/translateRequest.dto';
import { NestOpenAiService } from '@AolfazNikfard/nest-open-ai';
import { privateRoute } from 'src/shared/decorator/privateRoute.decorator';
import { LoggerService } from 'src/logger/logger.service';

@Controller('translation')
export class TranslationController {
  constructor(
    private translationService: TranslationService,
    private openAiService: NestOpenAiService,
    private loggerService:LoggerService
  ) {
    loggerService.SetContext(TranslationController.name);
  }
  @Get()
  get(@Query() pagination: paginationDTO) {
    this.loggerService.log("In translation controller get by pagination");
    return this.translationService.get(pagination);
  }

  @Get(':phrase')
  getById(@Param('phrase') phrase) {
    return this.translationService.getTranslationBy(phrase);
  }

  @Post()
  insert(@Body() translation: insertTranslationDTO) {
    return this.translationService.insert(translation);
  }

  @Patch(':phrase')
  update(@Body() translation: updateTranslationDTO) {
    return this.translationService.update(translation);
  }

  @Delete(':phrase')
  delete(@Param('phrase') phrase) {
    return this.translationService.delete(phrase);
  }
  @Post('/translate')
  @privateRoute() // setMetadata("private",true)
  translate(@Body() translateRequest: translateRequestDTO) {
    const { sourceLang, targetLang, phrase } = translateRequest;
    return this.openAiService.translate(sourceLang, targetLang, phrase);
  }
}
