import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { PhotosService } from '../../service/photos.service';
import { CreatePhotoDto } from '../../dto/create-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { Writable } from 'stream';

@Controller('photo')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @ApiTags('Photos')
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
      url: `${process.env.BASE_URL}photo/file/${file.filename}`,
    };
  }

  @ApiTags('Photos')
  @Get('file/:file')
  file(@Param('file') file: string, @Res() res: Writable) {
    const fileStream = createReadStream(join(process.cwd(), 'uploads', file));
    fileStream.pipe(res);
  }
}
