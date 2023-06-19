import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TranslationModule } from './translation/translation.module';
import { EventModule } from './event/event.module';
import { NestOpenAiModule } from './nest-open-ai/nest-open-ai.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { GlobalBuildingBlocksBinderModule } from './global-building-blocks-binder/global-building-blocks-binder.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:"postgres",
    host:"localhost",
    port:5432,
    database:"translator",
    username:"postgres",
    password:"postgress",
    synchronize:true,
    autoLoadEntities:true
  }),
  UserModule,
  EventModule,
  TranslationModule,
  ConfigurationModule,
  GlobalBuildingBlocksBinderModule,
],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
