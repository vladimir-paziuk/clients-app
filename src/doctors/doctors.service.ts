import { Injectable, NotFoundException } from '@nestjs/common';
import { createDoctorEntity, DoctorDto, DoctorEntity } from './doctor.model';

@Injectable()
export class DoctorsService {
  private data: DoctorEntity[] = [];

  getData(): DoctorEntity[] {
    return this.data;
  }

  getEntityById(id: string): DoctorEntity {
    const found = this.data.find((item) => item.id === id);

    if (found) {
      return found;
    }
    throw new NotFoundException();
  }

  updateDoctorById(id: string, desc: string): DoctorEntity {
    const found = this.getEntityById(id);
    found.desc = desc;
    return found;
  }

  deleteEntityById(id: string): void {
    this.data = this.data.filter((item) => item.id !== id);
  }

  createEntity(data: DoctorDto): DoctorEntity {
    const entity = createDoctorEntity(data);
    this.data.push(entity);
    return entity;
  }
}
