import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { BaseEntity } from 'apps/common/constants/base.entity';
import { UserEntity } from 'apps/auth/entities/user.entity';

@Entity('doctors')
export class DoctorEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_id' })
  @Exclude({ toPlainOnly: true })
  user: UserEntity;
  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  specialization?: string;
}
