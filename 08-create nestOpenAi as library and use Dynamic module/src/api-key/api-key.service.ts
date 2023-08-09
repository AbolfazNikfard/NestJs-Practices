import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiKeyEntity } from './entities/api-key.entity';
import { Equal, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKeyEntity)
    private readonly _apiKeyRepository: Repository<ApiKeyEntity>,
    private readonly _userService: UserService,
  ) {}
  async create(createApiKeyDto: CreateApiKeyDto) {
    try {
      const existUser = await this._userService.ExistUser(
        createApiKeyDto.userId,
      );
      if (existUser) return this._apiKeyRepository.save(createApiKeyDto);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
  async existApiKey(apiKey:string){
    const existApiKey = await this._apiKeyRepository.findOneBy({
      apiKey: Equal(apiKey)
    })
    return !!existApiKey;
  }
  findAll() {
    return this._apiKeyRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} apiKey`;
  }

  update(id: number, updateApiKeyDto: UpdateApiKeyDto) {
    return `This action updates a #${id} apiKey`;
  }

  remove(id: number) {
    return `This action removes a #${id} apiKey`;
  }
}
