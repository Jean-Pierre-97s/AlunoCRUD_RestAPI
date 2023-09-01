import { CreateAlunoDto } from '../dto/create-aluno.dto';

export abstract class IAlunoRepository {
  abstract create(createAlunoDto: CreateAlunoDto);
  abstract findById(id: string);
}
