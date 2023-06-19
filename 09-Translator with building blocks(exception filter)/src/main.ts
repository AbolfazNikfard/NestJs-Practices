import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { dirname, join } from 'path';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.setViewEngine("ejs");
    app.setBaseViewsDir("views");
    app.useStaticAssets(join(__dirname, '..', 'public'));
    await app.listen(3000);
    console.log('Server started on port 3000');
  } catch (err) {
    console.log('Catched Error: ', err);
  }
}
bootstrap();
