import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles', { schema: 'auth' })
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;
}
