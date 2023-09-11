import { Exclude } from 'class-transformer';
import { Role } from 'src/modules/user/enum/role.enum';
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

  @Column({ name: 'role', default: Role.operator })
  role: Role;

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
