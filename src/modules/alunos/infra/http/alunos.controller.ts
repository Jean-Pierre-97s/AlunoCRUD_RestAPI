import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlunoDto } from '../../dto/create-aluno.dto';
import { UpdateAlunoDto } from '../../dto/update-aluno.dto';
import { AlunosService } from '../../service/alunos.service';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post()
  async create(@Body() createAlunoDto: CreateAlunoDto) {
    const aluno = await this.alunosService.create(createAlunoDto);
    if (!aluno) throw new NotFoundException('Aluno não foi criado');
    return aluno;
  }

  @Get()
  findAll() {
    return this.alunosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alunosService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
    return this.alunosService.update(+id, updateAlunoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alunosService.remove(+id);
  }
}
