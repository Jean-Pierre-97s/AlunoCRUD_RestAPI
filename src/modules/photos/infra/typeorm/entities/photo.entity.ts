import { Exclude } from 'class-transformer';
import { Aluno } from 'src/modules/alunos/infra/typeorm/entities/aluno.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('photo')
export class Photo {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'originalName' })
  originalName: string;

  @Column({ name: 'filename', nullable: false })
  filename: string;

  @ManyToOne(() => Aluno, (aluno) => aluno.id, {})
  @JoinColumn({ name: 'aluno_id' })
  @Column({ name: 'aluno_id', nullable: true })
  alunoId: string;

  @Exclude()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
