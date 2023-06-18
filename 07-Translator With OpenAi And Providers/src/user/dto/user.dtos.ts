import { PickType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user.entity';

export class updateUserDTO extends PickType(UserEntity, ['password'] as const) {}
