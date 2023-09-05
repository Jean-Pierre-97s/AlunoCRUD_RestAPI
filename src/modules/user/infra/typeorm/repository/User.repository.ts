import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { IUserRepository } from 'src/modules/user/repository/IUser.repository';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    const userEntity = this.userRepository.create(user);
    const output = await this.userRepository.save(userEntity);
    return output;
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    await this.userRepository.delete(id);
    return `User ${user.email} was removed`;
  }
}
