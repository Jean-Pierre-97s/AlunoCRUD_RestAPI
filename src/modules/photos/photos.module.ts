import { Module } from '@nestjs/common';
import { PhotosService } from './service/photos.service';
import { PhotosController } from './infra/http/photos.controller';
import { Photo } from './infra/typeorm/entities/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoRepository } from './infra/typeorm/repository/Photo.repository';
import { IPhotoRepository } from './repository/IPhoto.repository';
import { AlunosModule } from '../alunos/alunos.module';

@Module({
  imports: [AlunosModule, TypeOrmModule.forFeature([Photo])], // Import the module where AlunoRepository is provided
  controllers: [PhotosController],
  providers: [
    PhotosService,
    {
      provide: IPhotoRepository,
      useClass: PhotoRepository,
    },
    // ...
  ],
})
export class PhotosModule {}
