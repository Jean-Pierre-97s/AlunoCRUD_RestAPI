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
} from '@nestjs/common';
import { UserService } from '../../service/user.service';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { isUUID } from 'class-validator';
import { CreateUserDto } from '../../dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    if (!user) throw new NotFoundException('Usuário não foi criado');
    return user;
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid Id');
    }
    return await this.userService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid Id');
    }
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid Id');
    }
    return this.userService.remove(id);
  }
}
