import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PasswordCrypt } from 'src/shared/utils/PasswordCrypt';
import { IUserRepository } from '../repository/IUser.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const emailValidation = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (emailValidation) {
      throw new BadRequestException(
        `Email ${emailValidation.email} already exists in database`,
      );
    }

    createUserDto.password = await PasswordCrypt.encode(createUserDto.password);
    console.log(createUserDto);
    return await this.userRepository.create(createUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findById(id: string) {
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
