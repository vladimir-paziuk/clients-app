import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DoctorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  desc?: string;
}
