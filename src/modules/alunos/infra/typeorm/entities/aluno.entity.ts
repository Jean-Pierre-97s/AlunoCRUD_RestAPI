import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'idade' })
  idade: number;

  @Column({ type: 'double precision', scale: 3, name: 'peso' })
  peso: number;

  @Column({ type: 'double precision', scale: 3, name: 'altura' })
  altura: number;

  @Exclude()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
