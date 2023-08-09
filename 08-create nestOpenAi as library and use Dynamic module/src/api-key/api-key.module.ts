import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyController } from './api-key.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKeyEntity } from './entities/api-key.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([ApiKeyEntity]),UserModule],
  controllers: [ApiKeyController],
  providers: [ApiKeyService],
  exports:[ApiKeyService]
})
export class ApiKeyModule {}
