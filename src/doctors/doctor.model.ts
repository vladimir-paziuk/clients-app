import { IsOptional } from 'class-validator';

export class DoctorEntity {
  id: string;
  name: string;
  @IsOptional()
  desc?: string;
}

export type DoctorDto = Pick<DoctorEntity, 'name' | 'desc'>;

export const createDoctorEntity = (data: DoctorDto): DoctorEntity => ({
  id: Date.now().toString(),
  name: data.name,
  desc: data.desc,
});
