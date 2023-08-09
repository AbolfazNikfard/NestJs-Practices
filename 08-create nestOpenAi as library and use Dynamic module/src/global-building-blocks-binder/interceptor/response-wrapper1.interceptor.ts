import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseWrapper1Interceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Response Wrapper 1 ');
    const responseObservable = next.handle();
    const resObv = responseObservable.pipe(
      map((response) => {
        return {
          Response: response,
        };
      }),
    );
    // responseObservable.subscribe((res) =>
    //   console.log('response wrapper 1: ', res),
    // );
    // responseObservable.subscribe((res) =>
    //   console.log('response wrapper 1: ', res),
    // );
    return resObv;
  }
}
