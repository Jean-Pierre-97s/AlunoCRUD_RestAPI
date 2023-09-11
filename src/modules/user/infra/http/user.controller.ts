import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../service/user.service';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { isUUID } from 'class-validator';
import { CreateUserDto } from '../../dto/create-user.dto';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from '../../enum/role.enum';
import { User } from '../typeorm/entities/user.entity';
import { GetCurrentUser } from 'src/shared/decorators/current-user.decorator';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.admin)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    if (!user) throw new NotFoundException('Usuário não foi criado');
    return user;
  }

  @Get()
  @Roles(Role.admin)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @Roles(Role.admin)
  async findById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid Id');
    }
    return await this.userService.findById(id);
  }

  @Patch(':id')
  //@Roles(Role.admin)
  update(
    @GetCurrentUser() currentUser: User,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid Id');
    }

    if (currentUser.id != id && currentUser.role != Role.admin) {
      throw new BadRequestException(
        'Usuário operador só pode alterar os próprios dados',
      );
    }
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.admin)
  remove(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid Id');
    }
    return this.userService.remove(id);
  }
}
