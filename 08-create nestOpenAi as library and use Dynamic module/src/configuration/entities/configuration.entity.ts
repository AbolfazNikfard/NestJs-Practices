import { IsString } from "class-validator"
import { Entity, PrimaryColumn } from "typeorm"
@Entity("configurations")
export class ConfigurationEntity{
    constructor(key:string,value:string){
        this.key = key,
        this.value = value
    }
    @PrimaryColumn()
    @IsString()
    key:string

    @PrimaryColumn()
    @IsString()
    value:string
}