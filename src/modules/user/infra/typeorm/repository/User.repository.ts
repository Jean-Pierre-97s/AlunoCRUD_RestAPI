import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { IUserRepository } from 'src/modules/user/repository/IUser.repository';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

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
}
