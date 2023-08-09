import { Module } from '@nestjs/common';
import { ErrorService } from './error.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorEntity } from './entities/error.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ErrorEntity])],
  providers: [ErrorService],
  exports:[ErrorService]
})
export class ErrorModule {}
