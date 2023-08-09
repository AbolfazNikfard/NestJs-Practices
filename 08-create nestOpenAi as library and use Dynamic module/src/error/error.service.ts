import { Injectable } from '@nestjs/common';
import { createErrorDTO } from './dtos/error.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorEntity } from './entities/error.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ErrorService {
    constructor(
        @InjectRepository(ErrorEntity)
        private readonly _errorRepository: Repository<ErrorEntity>
    ){

    }
    create(error:createErrorDTO){
        return this._errorRepository.save(error);
    }
}
