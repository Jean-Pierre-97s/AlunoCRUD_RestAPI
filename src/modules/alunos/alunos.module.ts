import { Module } from '@nestjs/common';
import { AlunosService } from './service/alunos.service';
import { AlunosController } from './infra/http/alunos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './infra/typeorm/entities/aluno.entity';
import { AlunoRepository } from './infra/typeorm/repository/Aluno.repository';
import { IAlunoRepository } from './repository/IAluno.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Aluno])],
  controllers: [AlunosController],
  providers: [
    AlunosService,
    {
      provide: IAlunoRepository,
      useClass: AlunoRepository,
    },
  ],
  exports: [IAlunoRepository],
})
export class AlunosModule {}
