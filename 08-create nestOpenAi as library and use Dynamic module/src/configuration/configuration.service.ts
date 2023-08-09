import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigurationEntity } from './entities/configuration.entity';
import { Repository } from 'typeorm';
import { insertConfigurationDTO } from './dto/configuration.dto';

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectRepository(ConfigurationEntity)
    private configurationRepository: Repository<ConfigurationEntity>,
  ) {}
  async insert(configuration: insertConfigurationDTO) {
    try {
      const existConfig = await this.configurationRepository.findOneBy({
        key: configuration.key,
        value: configuration.value,
      });
      if (!existConfig) {
        const newConfiguration = new ConfigurationEntity(
          configuration.key,
          configuration.value,
        );
        return await this.configurationRepository.save(newConfiguration);
      }
       else return 'configuration already exist';
    } catch (err) {
      throw new Error(err);
    }
  }
}
