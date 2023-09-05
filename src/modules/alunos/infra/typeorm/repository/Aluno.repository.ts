import { InjectRepository } from '@nestjs/typeorm';
import { IAlunoRepository } from 'src/modules/alunos/repository/IAluno.repository';
import { Repository } from 'typeorm';
import { Aluno } from '../entities/aluno.entity';
import { CreateAlunoDto } from 'src/modules/alunos/dto/create-aluno.dto';

export class AlunoRepository implements IAlunoRepository {
  constructor(
    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,
  ) {}

  async create(aluno: CreateAlunoDto) {
    const alunoEntity = this.alunoRepository.create(aluno);
    const output = await this.alunoRepository.save(alunoEntity);
    return output;
  }

  async findById(id: string) {
    const aluno = await this.alunoRepository.findOne({ where: { id } });
    return aluno;
  }
}
