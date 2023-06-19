import { IsEnum, IsString } from "class-validator";
import { Languages } from "../entities/translation.entity";

export class translateRequestDTO{
    @IsEnum(Languages)
    sourceLang:Languages

    @IsEnum(Languages)
    targetLang:Languages
    
    @IsString()
    phrase:string
}