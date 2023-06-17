import { IsDate, IsString } from 'class-validator';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';

export enum Languages {
  en,
  fa,
}
export class TranslationEntity {
  @IsString()
  id: string;
  @IsString()
  phrase: string;
  @IsString()
  translation: string;
  @IsString()
  fromLang: Languages;
  @IsString()
  toLang: Languages;
  @IsDate()
  createdAt: Date;
}

// const updateTranslationDTO:
//   new () => Omit<TranslationEntity, 'createdAt' | 'id'>
//  = TranslationEntity;
export class TranslationCreatDTO extends OmitType(TranslationEntity, [
  'id',
  'createdAt',
] as const) {}
export class TranslationUpdateDTO extends PartialType(
  OmitType(TranslationEntity, ['createdAt'] as const),
) {}
export class TranslationDeleteDTO extends PickType(TranslationEntity, [
  'id',
] as const) {}
