import { InjectRepository } from '@nestjs/typeorm';
import { IAlunoRepository } from 'src/modules/alunos/repository/IAluno.repository';
import { Repository } from 'typeorm';
import { Aluno } from '../entities/aluno.entity';
import { CreateAlunoDto } from 'src/modules/alunos/dto/create-aluno.dto';
import { UpdateAlunoDto } from 'src/modules/alunos/dto/update-aluno.dto';

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

  async findAll() {
    const aluno = await this.alunoRepository.find();
    return aluno;
  }

  async findById(id: string) {
    const aluno = await this.alunoRepository.findOne({ where: { id } });
    console.log(aluno);
    return aluno;
  }

  async findByEmail(email: string) {
    const aluno = await this.alunoRepository.findOne({ where: { email } });
    return aluno;
  }

  async update(id: string, aluno: UpdateAlunoDto) {
    await this.alunoRepository.update(id, aluno);
    const updatedAluno = await this.alunoRepository.findOne({ where: { id } });
    return updatedAluno;
  }

  async softRemove(id: string) {
    const aluno = await this.alunoRepository.findOne({ where: { id } });
    await this.alunoRepository.softDelete(id);
    return `Aluno ${aluno.nome} was removed`;
  }
}
