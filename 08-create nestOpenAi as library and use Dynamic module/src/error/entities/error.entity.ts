import { IsDate, IsNumber, IsOptional, IsString } from "class-validator"
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"
@Entity('errors')
export class ErrorEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    @IsNumber()
    statusCode:number
    
    @Column()
    @IsString()
    message:string

    @CreateDateColumn()
    @IsDate()
    @IsOptional()
    createdAt?:Date
}