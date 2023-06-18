import { IsEnum, IsOptional, IsString } from "class-validator";
import { TranslationEntity } from "src/translation/entities/translation.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum EventType{
    Like='like',
    Comment='comment'
}
@Entity("events")
export class EventEntity{
    // constructor(input:Partial<EventEntity>){
    //     Object.assign(this,input);
    // }
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        default:EventType
    })
    @IsEnum(EventType)
    type:EventType

    @Column()
    @IsString()
    translatedPhrase:string

    @Column()
    @IsString()
    userName:string

    @ManyToOne(()=>UserEntity , (user)=>user.events)
    @JoinColumn({name:"userName"})
    user:UserEntity

    @ManyToOne(()=>TranslationEntity , (translation)=>translation.events)
    @JoinColumn({name:"translatedPhrase"})
    translation:TranslationEntity

    @Column()
    @CreateDateColumn()
    @IsOptional()
    createdAt?:Date;
}