import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAlunoDto } from '../dto/create-aluno.dto';
import { UpdateAlunoDto } from '../dto/update-aluno.dto';
import { IAlunoRepository } from '../repository/IAluno.repository';

@Injectable()
export class AlunosService {
  constructor(private readonly alunoRepository: IAlunoRepository) {}

  async create(createAlunoDto: CreateAlunoDto) {
    // valida se o email já existe
    const emailValidation = await this.alunoRepository.findByEmail(
      createAlunoDto.email,
    );
    if (emailValidation) {
      throw new BadRequestException(
        `Email ${emailValidation.email} already exists in database`,
      );
    }

    return await this.alunoRepository.create(createAlunoDto);
  }

  async findAll() {
    return await this.alunoRepository.findAll();
  }

  async findById(id: string) {
    return await this.alunoRepository.findById(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateAlunoDto: UpdateAlunoDto) {
    return `This action updates a #${id} aluno`;
  }

  remove(id: number) {
    return `This action removes a #${id} aluno`;
  }
}
