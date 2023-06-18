import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true
    }));
    await app.listen(3000);
    console.log('Server started on port 3000');
  } catch (err) {
    console.log('Catched Error: ', err);
  }
}
bootstrap();
