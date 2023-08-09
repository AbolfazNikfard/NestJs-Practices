import { CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import { Observable, map } from 'rxjs';
@Injectable()
export class ResponseWrapper2Interceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Response Wrapper 2');
    const responseObservable = next.handle();
    // responseObservable.subscribe({
    //   next: (res) => console.log('response wrapper 2: ', res),
    // });
    return responseObservable.pipe(
      map((response) => {
        return {
          data: response,
        };
      }),
    );
  }
}
