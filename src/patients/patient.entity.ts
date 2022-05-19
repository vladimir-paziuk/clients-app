import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'common/constants/base.entity';
import { UserEntity } from 'auth/user.entity';
import { BLOOD_TYPE_ENUM } from 'common/constants/blood-type.enum';

@Entity()
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
