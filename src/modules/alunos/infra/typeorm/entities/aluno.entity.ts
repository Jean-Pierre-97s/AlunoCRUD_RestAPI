import { Exclude } from 'class-transformer';
import { Status } from 'src/modules/alunos/enum/status.enum';
import { Photo } from 'src/modules/photos/infra/typeorm/entities/photo.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
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

  @OneToMany(() => Photo, (photo) => photo.alunoId, {
    cascade: true,
    onUpdate: 'CASCADE',
    eager: true,
  }) // Relação um para muitos com a entidade Photo
  photos: Photo[];
}
