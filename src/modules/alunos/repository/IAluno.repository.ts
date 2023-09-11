import { CreateAlunoDto } from '../dto/create-aluno.dto';
import { UpdateAlunoDto } from '../dto/update-aluno.dto';

export abstract class IAlunoRepository {
  abstract create(createAlunoDto: CreateAlunoDto);
  abstract findAll();
  abstract findById(id: string);
  abstract findByEmail(email: string);
  abstract update(id: string, updateAlunoDto: UpdateAlunoDto);
  abstract softRemove(id: string);
}
