import { Transform } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class paginationDTO{
    @IsNumber()
    @Min(1)
    @Transform((input)=> parseInt(input.value))
    page:number;
    
    @IsNumber()
    @Min(1)
    @Transform((input)=> parseInt(input.value))
    limit:number;
}