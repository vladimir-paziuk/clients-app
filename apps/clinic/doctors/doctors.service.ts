import { Injectable, NotFoundException } from '@nestjs/common';
import { DoctorsRepository } from 'apps/clinic/doctors/doctors.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from 'apps/clinic/doctors/doctor.entity';
import { DoctorDto } from 'apps/clinic/doctors/dtos/doctor.dto';
import { DoctorQueryDto } from 'apps/clinic/doctors/dtos/doctor-query.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(DoctorsRepository)
    private doctorsRepository: DoctorsRepository,
  ) {}

  async createDoctor(data: DoctorDto): Promise<DoctorEntity> {
    return this.doctorsRepository.createDoctor(data);
  }

  async getDoctors(query?: DoctorQueryDto): Promise<DoctorEntity[]> {
    return await this.doctorsRepository.getDoctors(query);
  }

  async getDoctorById(id: string): Promise<DoctorEntity> {
    const found = await this.doctorsRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async getDoctorByUserId(userId: string): Promise<DoctorEntity> {
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

  async deleteDoctorById(id: string): Promise<void> {
    const result = await this.doctorsRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
