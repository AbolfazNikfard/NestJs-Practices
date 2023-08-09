import { PickType } from "@nestjs/mapped-types";
import { ErrorEntity } from "../entities/error.entity";

export class createErrorDTO extends PickType(ErrorEntity,['message','statusCode'] as const){}