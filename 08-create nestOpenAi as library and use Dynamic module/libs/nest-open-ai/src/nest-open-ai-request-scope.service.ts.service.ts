import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({
  scope: Scope.REQUEST,
})
export class NestOpenAiRequestScopeServiceTsService {
  constructor(
    @Inject(REQUEST)
    private request: Request,
  ) {}
}
