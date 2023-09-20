import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePhotoDto } from '../dto/create-photo.dto';
import { UpdatePhotoDto } from '../dto/update-photo.dto';
import { IAlunoRepository } from 'src/modules/alunos/repository/IAluno.repository';
import { IPhotoRepository } from '../repository/IPhoto.repository';

@Injectable()
export class PhotosService {
  constructor(
    private readonly alunoRepository: IAlunoRepository,
    private readonly photoRepository: IPhotoRepository,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(createPhotoDto: CreatePhotoDto, file: Express.Multer.File) {
    const aluno = await this.alunoRepository.findById(createPhotoDto.alunoId);
    if (!aluno) throw new BadRequestException('Aluno não encontrado');

    createPhotoDto.filename = file.filename;
    createPhotoDto.originalName = file.originalname;

    return await this.photoRepository.create(createPhotoDto);
  }

  findAll() {
    return `This action returns all photos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} photo`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  remove(id: number) {
    return `This action removes a #${id} photo`;
  }
}
