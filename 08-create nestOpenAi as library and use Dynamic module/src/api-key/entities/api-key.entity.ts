import { IsOptional, IsString } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('api-keys')
export class ApiKeyEntity {
  @PrimaryColumn()
  @IsString()
  userId: string;

  @PrimaryColumn()
  @Column({
    generated: 'uuid',
  })
  apiKey: string;

  @CreateDateColumn()
  @IsOptional()
  createdAt?:Date

  @ManyToOne(() => UserEntity, (user) => user.apiKeys)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
