import { Exclude } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity('user')
export class User {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Exclude()
  @Column({ name: 'password' })
  password: string;

  @Exclude()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
