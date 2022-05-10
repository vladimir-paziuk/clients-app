import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class DoctorEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty()
  @Column()
  name: string;
  @ApiProperty()
  @Column()
  desc?: string;
}
