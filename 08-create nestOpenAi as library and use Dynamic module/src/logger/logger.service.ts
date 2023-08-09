import { Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class LoggerService {
  context: string = 'LoggerService';
  public log(message: string) {
    console.log(`${this.context} - ${message}`);
  }
  public SetContext(context: string) {
    this.context = context;
  }
}
