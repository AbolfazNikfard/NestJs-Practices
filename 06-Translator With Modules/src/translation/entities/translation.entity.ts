import { IsString, IsEnum, IsOptional } from 'class-validator';
import { EventEntity } from 'src/event/entities/event.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
export enum Languages {
  en='en',
  fa='fa',
  ar='ar',
  fr='fr'
}
@Entity("translation")
export class TranslationEntity {
  constructor(input: Partial<TranslationEntity>) {
    Object.assign(this, input);
  }
  @PrimaryColumn()
  @IsString()
  id: string;

  @Column()
  @IsString()
  phrase: string;

  @Column({
    default:Languages
  })
  @IsString()
  translate: string;

  @Column({
    default:Languages
  })
  @IsEnum(Languages)
  fromLang: Languages;

  @Column()
  @IsEnum(Languages)
  toLang: Languages;

  @Column({
    default:0
  })
  @IsOptional()
  likes?:number

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  
  @ManyToMany(() => UserEntity, (users) => users.translations)
  users: UserEntity[];
  
  @OneToMany(() => EventEntity, (events) => events.translation)
  events: EventEntity[];

}
