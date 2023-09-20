import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { PhotosService } from '../../service/photos.service';
import { CreatePhotoDto } from '../../dto/create-photo.dto';
import { UpdatePhotoDto } from '../../dto/update-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('photo')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          // Generate a custom filename here
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const newFilename = `${uniqueSuffix}${extname(file.originalname)}`;
          callback(null, newFilename);
        },
      }),
    }),
  )
  async uploadFileAndPassValidation(
    @Body() createPhotoDto: CreatePhotoDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg', // todo colocar outros formatos de imagem (|| 'jpg' || 'png')
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 100,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    const photo = await this.photosService.create(createPhotoDto, file);
    return {
      photo: photo,
      file: file,
    };
  }

  @Get()
  findAll() {
    return this.photosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    return this.photosService.update(+id, updatePhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photosService.remove(+id);
  }
}
