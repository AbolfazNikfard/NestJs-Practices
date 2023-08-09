import {
  DynamicModule,
  InjectionToken,
  Module,
  OptionalFactoryDependency,
  Provider,
} from '@nestjs/common';
import { NestOpenAiService } from './nest-open-ai.service';
import { Configuration, OpenAIApi } from 'openai';
import { OPEN_AI_API_KEY } from './constants/tokens';
const ConfigurationProvider: Provider = {
  provide: Configuration,
  inject: [OPEN_AI_API_KEY],
  useFactory(apiKey) {
    return new Configuration({
      apiKey: apiKey,
    });
  },
};
const OpenAIAPIProvider: Provider = {
  provide: OpenAIApi,
  inject: [Configuration],
  useFactory(configuration) {
    const config = configuration;
    return new OpenAIApi(config);
  },
};
@Module({})
export class NestOpenAiModule {
  static register(apiKey: string): DynamicModule {
    return {
      module: NestOpenAiModule,
      providers: [
        {
          provide: OPEN_AI_API_KEY,
          useValue: apiKey,
        },
        ConfigurationProvider,
        OpenAIAPIProvider,
        NestOpenAiService,
      ],
      exports: [NestOpenAiService],
    };
  }
  static registerAsync(options: {
    imports: any[];
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
    useFactory: (...args: any[]) => string | Promise<string>;
  }): DynamicModule {
    return {
      module: NestOpenAiModule,
      imports: options.imports,
      providers: [
        {
          provide: OPEN_AI_API_KEY,
          inject: options.inject,
          useFactory: options.useFactory,
        },
        OpenAIAPIProvider,
        ConfigurationProvider,
        NestOpenAiService,
      ],
      exports: [NestOpenAiService],
    };
  }
}
