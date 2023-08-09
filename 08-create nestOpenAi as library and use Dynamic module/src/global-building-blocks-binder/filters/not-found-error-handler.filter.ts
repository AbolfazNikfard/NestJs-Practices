import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException)
export class NotFoundErrorHandlerFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    console.log("in notfound exception filter");
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    response.status(404).render("404-NotFound.ejs");
  }
}
