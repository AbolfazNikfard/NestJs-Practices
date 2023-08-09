import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { dirname, join } from 'path';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.setViewEngine('ejs');
    app.setBaseViewsDir('views');
    app.useStaticAssets(join(__dirname, '..', 'public'));
    const port = process.env.PORT;
    await app.listen(port);
    console.log(`Server started on port ${port}`);
  } catch (err) {
    console.log('catched error: ', err);
  }
}
bootstrap();
