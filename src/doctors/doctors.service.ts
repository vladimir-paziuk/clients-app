import { Injectable, NotFoundException } from '@nestjs/common';
import { DoctorsRepository } from './doctors.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from './doctor.entity';
import { DoctorDto } from 'src/doctors/dtos/doctor.dto';
import { DoctorQueryDto } from 'src/doctors/dtos/doctor-query.dto';

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

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async getEntityByUserId(userId: string): Promise<DoctorEntity> {
    const found = await this.doctorsRepository.findOne({
      where: { userId },
    });

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async updateDoctorById(id: string, dto: DoctorDto): Promise<void> {
    const result = await this.doctorsRepository.update({ id }, dto);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async deleteEntityById(id: string): Promise<void> {
    const result = await this.doctorsRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
