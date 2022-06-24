import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { BaseEntity } from '@vp-clients-app/common-pkg';

@Entity('doctors')
export class DoctorEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @OneToOne(() => UserEntity, { eager: true })
  // @JoinColumn({ name: 'user_id' })
  // @Exclude({ toPlainOnly: true })
  // user: UserEntity;
  @Column({ name: 'user_id', unique: true })
  userId: string;

  @Column()
  specialization?: string;
}
