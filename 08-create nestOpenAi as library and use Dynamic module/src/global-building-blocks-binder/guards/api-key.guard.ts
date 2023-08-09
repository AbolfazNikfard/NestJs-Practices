import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ApiKeyService } from 'src/api-key/api-key.service';
import { PRIVATEROUTE_METADATA } from 'src/shared/constant/shared.constant';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _apiKeyService: ApiKeyService,
  ) {}
  async canActivate(context: ExecutionContext) {
    console.log('handler: ', context.getHandler());
    const isPrivateRoute = this._reflector.get(
      PRIVATEROUTE_METADATA,
      context.getHandler(),
    );
    if (!isPrivateRoute) return true;
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'] as string;
    console.log('apiKey: ', apiKey);
    const existApiKey = await this._apiKeyService.existApiKey(apiKey);
    console.log('existApiKey: ', existApiKey);
    if (existApiKey) return true;
    return false;
  }
}
