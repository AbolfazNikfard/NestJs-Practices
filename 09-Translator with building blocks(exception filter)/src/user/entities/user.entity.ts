import { IsStrongPassword, Length } from 'class-validator';
import { EventEntity } from 'src/event/entities/event.entity';
import { TranslationEntity } from 'src/translation/entities/translation.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
@Entity('users')
export class UserEntity {
  constructor(input: Partial<UserEntity>) {
    Object.assign(this, input);
  }

  @PrimaryColumn()
  @Length(1,100)
  username: string;

  @Column()
  @IsStrongPassword()
  password: string;

  @JoinTable()
  @ManyToMany(() => TranslationEntity, (translations) => translations.users)
  translations: TranslationEntity[];

  @OneToMany(() => EventEntity, (events) => events.user)
  events: EventEntity[];
}
