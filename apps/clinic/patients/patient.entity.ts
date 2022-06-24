import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { UserEntity } from 'apps/auth/src/users/user.entity';
import { BaseEntity } from '@vp-clients-app/common-pkg';
import { BLOOD_TYPE_ENUM } from '@vp-clients-app/common-pkg';

@Entity('patients')
export class PatientEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_id' })
  @Exclude({ toPlainOnly: true })
  user: UserEntity;
  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'blood_type', enum: BLOOD_TYPE_ENUM, nullable: true })
  bloodType: BLOOD_TYPE_ENUM;
}
