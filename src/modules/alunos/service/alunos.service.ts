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

  async update(id: string, updateAlunoDto: UpdateAlunoDto) {
    // valida se o id existe
    const user = await this.alunoRepository.findById(id);
    if (!user) {
      throw new BadRequestException(`${id} doesnt exists in database`);
    }
    // valida se o email já existe
    const emailValidation = await this.alunoRepository.findByEmail(
      updateAlunoDto.email,
    );

    if (emailValidation) {
      // Vê se o email existente é ou não do usuário que vai ser atualizado.
      if (emailValidation.id != id) {
        throw new BadRequestException(
          `Email ${emailValidation.email} already exists in database`,
        );
      }
    }
    return await this.alunoRepository.update(id, updateAlunoDto);
  }

  async remove(id: string) {
    return await this.alunoRepository.softRemove(id);
  }
}
