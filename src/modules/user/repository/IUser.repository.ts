import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export abstract class IUserRepository {
  abstract create(createUserDto: CreateUserDto);
  abstract findById(id: string);
  abstract findByEmail(id: string);
  abstract findAll();
  abstract update(id: string, updateUserDto: UpdateUserDto);
  abstract remove(id: string);
}
