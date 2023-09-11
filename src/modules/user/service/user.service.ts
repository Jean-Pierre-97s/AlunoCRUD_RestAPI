import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PasswordCrypt } from 'src/shared/utils/PasswordCrypt';
import { IUserRepository } from '../repository/IUser.repository';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async create(createUserDto: CreateUserDto) {
    // valida se o email já existe
    const emailValidation = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (emailValidation) {
      throw new BadRequestException(
        `Email ${emailValidation.email} already exists in database`,
      );
    }

    createUserDto.password = await PasswordCrypt.encode(createUserDto.password);
    return await this.userRepository.create(createUserDto);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findById(id: string) {
    return await this.userRepository.findById(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // valida se o id existe
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new BadRequestException(`${id} doesnt exists in database`);
    }
    // valida se o email já existe
    const emailValidation = await this.userRepository.findByEmail(
      updateUserDto.email,
    );

    if (emailValidation) {
      // Vê se o email existente é ou não do usuário que vai ser atualizado.
      if (emailValidation.id != id) {
        throw new BadRequestException(
          `Email ${emailValidation.email} already exists in database`,
        );
      }
    }
    updateUserDto.password = await PasswordCrypt.encode(updateUserDto.password);
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    // valida se o id existe
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new BadRequestException(`${id} doesnt exists in database`);
    }

    return await this.userRepository.remove(id);
  }
}
