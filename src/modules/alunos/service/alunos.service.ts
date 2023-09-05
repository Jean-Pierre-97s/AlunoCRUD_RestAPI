import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from '../dto/create-aluno.dto';
import { UpdateAlunoDto } from '../dto/update-aluno.dto';
import { IAlunoRepository } from '../repository/IAluno.repository';

@Injectable()
export class AlunosService {
  constructor(private readonly alunoRepository: IAlunoRepository) {}

  async create(createAlunoDto: CreateAlunoDto) {
    return await this.alunoRepository.create(createAlunoDto);
  }

  findAll() {
    return `This action returns all alunos`;
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
