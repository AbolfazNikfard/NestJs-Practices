import { EventEntity } from "../entities/event.entity";
import { OmitType, PickType } from '@nestjs/mapped-types';

export class insertLikeEventDTO extends OmitType(EventEntity,['id'] as const){}
export class deleteLikeEventDTO extends PickType(EventEntity,['userName','translatedPhrase'] as const){}