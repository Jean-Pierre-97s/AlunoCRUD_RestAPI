import { Exclude } from 'class-transformer';
import { Status } from 'src/modules/alunos/enum/status.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('aluno')
export class Aluno {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'sobrenome' })
  sobrenome: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'idade' })
  idade: number;

  @Column({ type: 'double precision', scale: 3, name: 'peso' })
  peso: number;

  @Column({ type: 'double precision', scale: 3, name: 'altura' })
  altura: number;

  @Column({ name: 'status', default: Status.pendente })
  status: Status;

  @Exclude()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
