import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';

import { BaseEntity } from '@vp-clients-app/common-pkg';
import { RoleEntity } from 'apps/auth/entities/role.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  // @Column({ select: false })
  @Column()
  password: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: RoleEntity[];
}
