import { Module } from '@nestjs/common';
import { PhotosService } from './service/photos.service';
import { PhotosController } from './infra/http/photos.controller';
import { Photo } from './infra/typeorm/entities/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
  controllers: [PhotosController],
  providers: [
    PhotosService,
    //   {
    //    provide: IPhotoRepository,
    //   useClass: PhotoRepository,
    //  },
  ],
})
export class PhotosModule {}
