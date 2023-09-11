import { CreateAlunoDto } from '../dto/create-aluno.dto';

export abstract class IAlunoRepository {
  abstract create(createAlunoDto: CreateAlunoDto);
  abstract findAll();
  abstract findById(id: string);
  abstract findByEmail(email: string);
}
