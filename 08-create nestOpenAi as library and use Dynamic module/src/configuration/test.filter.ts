import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { NotFoundErrorHandlerFilter } from '../global-building-blocks-binder/filters/not-found-error-handler.filter';
import { ErrorService } from 'src/error/error.service';
import { createErrorDTO } from 'src/error/dtos/error.dto';

@Catch(HttpException)
export class TestFilter implements ExceptionFilter {
  constructor(
    //private readonly _notFoundErrorHandler:NotFoundErrorHandlerFilter,
    private readonly _errService: ErrorService,
  ) {}
  async catch(exception: HttpException, host: ArgumentsHost) {
    try {
      const context = host.switchToHttp();
      const response = context.getResponse();
      console.log('in global error catch');
      console.log('cathed error: ', exception.getResponse());
      const exceptionObject = exception.getResponse() as any;
      let exceptionMessage: string;
      if (Array.isArray(exceptionObject.message))
        exceptionMessage = exceptionObject.message.join(' - ');
      else exceptionMessage = exceptionObject.message;

      const errorDto = new createErrorDTO();
      errorDto.message = exceptionMessage;
      errorDto.statusCode = exceptionObject.statusCode;
      const error = await this._errService.create(errorDto);
      switch (error.statusCode) {
        case 400:
          console.log('400');
          break;
        case 401:
          console.log('401');
          break;
        case 403:
          console.log('403');
          break;
        case 404:
          console.log('404');
          break;
        case 500:
          console.log('500');
          break;
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
