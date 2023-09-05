import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PasswordCrypt } from 'src/shared/utils/PasswordCrypt';
import { IUserRepository } from '../repository/IUser.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await PasswordCrypt.encode(createUserDto.password);
    return await this.userRepository.create(createUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    return await this.userRepository.findById(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
