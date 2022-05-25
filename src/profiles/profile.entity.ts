import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/constants/base.entity';
import { UserEntity } from 'src/auth/user.entity';
import { GENDER_ENUM } from 'src/common/constants/gender.enum';

@Entity()
export class ProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_id' })
  @Exclude({ toPlainOnly: true })
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
