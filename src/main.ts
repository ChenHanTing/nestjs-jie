import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

/**
 * src/main.js is an entry point
 *
 * introduction
 *   https://newideas.coderbridge.io/2020/11/22/%E7%94%A8-nestjs-%E9%96%8B%E7%99%BC-api-%E5%90%A7-(%E4%BA%8C)-%E5%B0%88%E6%A1%88%E6%9E%B6%E6%A7%8B/
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  await app.listen(3000);
}
bootstrap();
