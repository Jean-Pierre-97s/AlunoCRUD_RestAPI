import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './infra/http/user.controller';
import { User } from './infra/typeorm/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './infra/typeorm/repository/User.repository';
import { IUserRepository } from './repository/IUser.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
