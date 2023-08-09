import { PickType } from "@nestjs/mapped-types";
import { ApiKeyEntity } from "../entities/api-key.entity";

export class CreateApiKeyDto extends PickType(ApiKeyEntity,['userId'] as const) {}
