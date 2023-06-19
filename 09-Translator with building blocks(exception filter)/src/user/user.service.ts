import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { updateUserDTO } from './dto/user.dtos';
import { paginationDTO } from 'src/dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  get(pagination:paginationDTO){
    const {page, limit} = pagination;
    return this.userRepository.find({
      skip:(page-1)*limit,
      take:limit
    })
  }

  async getUserBy(username: string) {
    try {
      const existUser = await this.userRepository.findOneBy({
        username: username,
      });
      if (existUser) return existUser;
      else return undefined;
    } catch (err) {
      throw new Error(err);
    }
  }

  async insert(user: UserEntity) {
    const existUser = await this.userRepository.findOneBy({
      username: user.username,
    });
    if (!existUser) return await this.userRepository.save(user);
    else return 'userName already exist';
  }

  async update(updateUser: updateUserDTO, username: string) {
    try {
      const existUser = await this.userRepository.findOneBy({
        username: username,
      });
      if (existUser) {
        existUser.password = updateUser.password;
        await this.userRepository.save(existUser);
        return 'user updated';
      } else return undefined;
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete(wannaDeleteUsername: string) {
    try {
      const existUser = await this.userRepository.findOneBy({
        username: wannaDeleteUsername,
      });
      if (existUser) {
        await this.userRepository.remove(existUser);
        return `user deleted`;
      } else return undefined;
    } catch (err) {
      throw new Error(err);
    }
  }
}
