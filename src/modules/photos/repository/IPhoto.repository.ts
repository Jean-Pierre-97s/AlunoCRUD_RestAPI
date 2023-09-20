import { CreatePhotoDto } from 'src/modules/photos/dto/create-photo.dto';

export abstract class IPhotoRepository {
  abstract create(createPhotoDto: CreatePhotoDto);
}
