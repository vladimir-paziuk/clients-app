import { Injectable, NotFoundException } from '@nestjs/common';
import { DoctorsRepository } from './doctors.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from './doctor.entity';
import { DoctorDto } from './dtos/doctorDto';
import { DoctorQueryDto } from './dtos/doctorQueryDto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(DoctorsRepository)
    private doctorsRepository: DoctorsRepository,
  ) {}

  async getData(query?: DoctorQueryDto): Promise<DoctorEntity[]> {
    return await this.doctorsRepository.getDoctors(query);
  }

  async createEntity(data: DoctorDto): Promise<DoctorEntity> {
    const entity = this.doctorsRepository.create(data);
    await this.doctorsRepository.save(entity);
    return entity;
  }

  async getEntityById(id: string): Promise<DoctorEntity> {
    const found = await this.doctorsRepository.findOne({
      where: { id },
    });

    if (found) {
      return found;
    }
    throw new NotFoundException();
  }

  async updateDoctorById(id: string, desc: string): Promise<DoctorEntity> {
    const entity = await this.getEntityById(id);
    entity.desc = desc;
    await this.doctorsRepository.save(entity);
    return entity;
  }

  async deleteEntityById(id: string): Promise<void> {
    const result = await this.doctorsRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
