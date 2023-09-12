import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { AlunosModule } from './modules/alunos/alunos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './modules/alunos/infra/typeorm/entities/aluno.entity';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/infra/typeorm/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { PhotosModule } from './modules/photos/photos.module';
import { Photo } from './modules/photos/infra/typeorm/entities/photo.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Aluno, User, Photo],
      synchronize: true,
    }),
    AlunosModule,
    UserModule,
    AuthModule,
    PhotosModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
