import { Module, ValidationPipe} from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { NotFoundErrorHandlerFilter } from './filters/not-found-error-handler.filter';
import { ErrorModule } from 'src/error/error.module';
import { InternalServerErrorHandlerFilter } from './filters/internal-server-error-handler.filter';
import { ApiKeyModule } from 'src/api-key/api-key.module';
import { ApiKeyGuard } from './guards/api-key.guard';
import { ResponseWrapper1Interceptor } from './interceptor/response-wrapper1.interceptor';
import { ResponseWrapper2Interceptor } from './interceptor/response-wrapper2.interceptor';

@Module({
  imports: [ErrorModule, ApiKeyModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundErrorHandlerFilter,
    },
    {
      provide: APP_FILTER,
      useClass: InternalServerErrorHandlerFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseWrapper1Interceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseWrapper2Interceptor,
    }
    // {
    //   provide:APP_FILTER,
    //   useClass:TestFilter
    // },
  ],
})
export class GlobalBuildingBlocksBinderModule {}
