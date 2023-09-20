import { InjectRepository } from '@nestjs/typeorm';
import { CreatePhotoDto } from 'src/modules/photos/dto/create-photo.dto';
import { IPhotoRepository } from 'src/modules/photos/repository/IPhoto.repository';
import { Repository } from 'typeorm';
import { Photo } from '../entities/photo.entity';

export class PhotoRepository implements IPhotoRepository {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async create(photo: CreatePhotoDto) {
    console.log(photo);
    const photoEntity = this.photoRepository.create({
      filename: photo.filename,
      originalName: photo.originalName,
      alunoId: photo.alunoId,
    });
    const output = await this.photoRepository.save(photoEntity);
    return output;
  }
}
