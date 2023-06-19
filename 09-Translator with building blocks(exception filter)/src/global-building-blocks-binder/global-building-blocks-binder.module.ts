import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { NotFoundErrorHandlerFilter } from './filters/not-found-error-handler.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundErrorHandlerFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class GlobalBuildingBlocksBinderModule {}
