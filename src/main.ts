import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';

/**
 * src/main.js is an entry point
 *
 * introduction
 *   https://newideas.coderbridge.io/2020/11/22/%E7%94%A8-nestjs-%E9%96%8B%E7%99%BC-api-%E5%90%A7-(%E4%BA%8C)-%E5%B0%88%E6%A1%88%E6%9E%B6%E6%A7%8B/
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 靜態頁面
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // ejs
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('Blog API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
