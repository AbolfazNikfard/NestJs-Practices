import { OmitType, PartialType } from "@nestjs/mapped-types";
import { TranslationEntity } from "src/translation/entities/translation.entity";

export class insertTranslationDTO extends OmitType(TranslationEntity,['id','createdAt'] as const){}
export class updateTranslationDTO extends PartialType(OmitType(TranslationEntity,['id','createdAt'] as const)){}