import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';

/* mongoose, validation, config */
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BlogsModule } from './blogs/blogs.module';
import * as Joi from '@hapi/joi';

/**
 * PostsModule:
 *   https://www.thisdot.co/blog/introduction-to-restful-apis-with-nestjs
 *
 * BlogsModule:
 *   https://wanago.io/2021/08/16/api-nestjs-mongodb/
 *
 * Blogs: 有存進mongodb
 * Posts: 沒存進mongodb
 */
@Module({
  imports: [BlogsModule, PostsModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_DATABASE: Joi.string().required(),
        MONGO_PATH: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('MONGO_USERNAME');
        const password = configService.get('MONGO_PASSWORD');
        const database = configService.get('MONGO_DATABASE');
        const host = configService.get('MONGO_HOST');
        const path = configService.get('MONGO_PATH');

        console.log(`%c==== mongodb path: ${path} ====`, "color:blue;")

        return {
          uri: path || `mongodb://${username}:${password}@${host}`,
          dbName: database,
        };
      },
      inject: [ConfigService],
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
