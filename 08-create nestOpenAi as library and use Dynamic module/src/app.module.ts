import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TranslationModule } from './translation/translation.module';
import { EventModule } from './event/event.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { GlobalBuildingBlocksBinderModule } from './global-building-blocks-binder/global-building-blocks-binder.module';
import { ApiKeyModule } from './api-key/api-key.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'translator',
      username: 'postgres',
      password: 'postgress',
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    EventModule,
    TranslationModule,
    ConfigurationModule,
    GlobalBuildingBlocksBinderModule,
    ApiKeyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
