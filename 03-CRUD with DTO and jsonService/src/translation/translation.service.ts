import { Injectable } from '@nestjs/common';
import * as md5 from 'md5';
import { JsonStorageService } from 'src/db/json-storage.service';
import {
  TranslationCreatDTO,
  TranslationDeleteDTO,
  TranslationEntity,
  TranslationUpdateDTO,
} from './entities/translation.entity';

@Injectable()
export class TranslationService {
  constructor(private jsonStorageService: JsonStorageService) {
    console.log('TranslationService instantiated');
  }
  selectAll() {
    try {
      return this.jsonStorageService.get('translation');
    } catch (err) {
      throw new Error(err.message);
    }
  }
  select(translation: string) {
    const translationId = md5(translation);
    return this.jsonStorageService.getById('translation', translationId);
  }
  insert(translation: TranslationCreatDTO) {
    try {
      const existsTranslationId = md5(translation.phrase);
      const existsTranslation = this.jsonStorageService.getById('translation', existsTranslationId);
      if (existsTranslation === "Item not found") {
        const newTranslation = new TranslationEntity();
        newTranslation.id = md5(translation.phrase);
        newTranslation.phrase = translation.phrase;
        newTranslation.translation = translation.translation;
        newTranslation.fromLang = translation.fromLang;
        newTranslation.toLang = translation.toLang;
        newTranslation.createdAt = new Date();
        return this.jsonStorageService.create('translation', newTranslation);
      } else return 'Translation already has been added';
    } catch (err) {
      throw new Error(err.message);
    }
  }

  update(translation: TranslationUpdateDTO) {
    try {
      console.log('update translation : ', translation);
      return this.jsonStorageService.updateById(
        'translation',
        translation.id,
        translation,
      );
    } catch (err) {
      throw new Error(err.message);
    }
  }
  delete(translation: TranslationDeleteDTO) {
    try {
      return this.jsonStorageService.deleteById('translation', translation.id);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
