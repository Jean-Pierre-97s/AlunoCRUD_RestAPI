import { CreateUserDto } from '../dto/create-user.dto';

export abstract class IUserRepository {
  abstract create(createUserDto: CreateUserDto);
  abstract findById(id: string);
  abstract findByEmail(id: string);
}
