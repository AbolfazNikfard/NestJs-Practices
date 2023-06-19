import { Module } from '@nestjs/common';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationEntity } from './entities/configuration.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ConfigurationEntity])],
  controllers: [ConfigurationController],
  providers: [ConfigurationService]
})
export class ConfigurationModule {}
