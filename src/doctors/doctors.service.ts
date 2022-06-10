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

  async getEntity(dto: Partial<DoctorEntity>): Promise<DoctorEntity> {
    const found = await this.doctorsRepository.findOne({
      where: dto,
    });

    if (found) {
      return found;
    }
    throw new NotFoundException();
  }

  async getEntityById(id: string): Promise<DoctorEntity> {
    return this.getEntity({ id });
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
