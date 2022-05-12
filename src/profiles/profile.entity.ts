import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from 'common/constants/base.entity';

import { UserEntity } from 'auth/user.entity';
import { GENDER_ENUM } from 'common/constants/gender.enum';

@Entity()
export class ProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
  @Column({ name: 'user_id' })
  userId: string;

  @Column({ enum: GENDER_ENUM, nullable: true })
  gender: string;
  @Column({ nullable: true })
  image: string;
  @Column({ name: 'first_name', nullable: true })
  firstName: string;
  @Column({ name: 'last_name', nullable: true })
  lastName: string;
}
