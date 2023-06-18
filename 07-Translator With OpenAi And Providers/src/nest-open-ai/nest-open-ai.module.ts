import { Module, Provider } from '@nestjs/common';
import { NestOpenAiService } from './nest-open-ai.service';
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from './constants/tokens';
import { DataSource } from 'typeorm';
import { ConfigurationEntity } from 'src/configuration/entities/configuration.entity';

const apiKeyProvider: Provider = {
  provide: OPENAI_API_KEY,
  inject: [DataSource],
  async useFactory(dataSource: DataSource) {
    try {
      console.log('In OpenAi_ApiKey Provider');
      const config = await dataSource.manager.findOneBy(ConfigurationEntity, {
        key: 'OPENAI_API_KEY',
      });
      return config.value;
    } catch (err) {
      throw new Error(err);
    }
  },
};

// useValue Provider
// const apiKeyProvider: Provider = {
//   provide: OPEN_AI_API_KEY,
//   useValue: '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',
// };

@Module({
  providers: [
    NestOpenAiService,
    {
      provide: Configuration,
      inject: [OPENAI_API_KEY],
      useFactory(apiKey) {
        console.log('In Configuration Provider');
        return new Configuration({
          apiKey: apiKey,
        });
      },
    },
    {
      provide: OpenAIApi,
      inject: [Configuration],
      useFactory(configuration) {
        console.log('In OpenAiApi Provider');
        const config = configuration;
        return new OpenAIApi(config);
      },
    },
    apiKeyProvider,
  ],
  exports: [NestOpenAiService],
})
export class NestOpenAiModule {}
