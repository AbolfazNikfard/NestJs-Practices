import { ArgumentsHost, Catch, ExceptionFilter, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';

@Catch(InternalServerErrorException)
export class InternalServerErrorHandlerFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    console.log(exception.getResponse())
    response.status(500).render("500-InternalServer.ejs");
  }
}
