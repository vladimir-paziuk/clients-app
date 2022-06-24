import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { JwtPayload } from 'apps/common/jwt/jwt.strategy';

import { PatientsRepository } from 'apps/clinic/patients/patients.repository';
import { PatientEntity } from 'apps/clinic/patients/patient.entity';
import { PatientCreateDto, PatientDto } from 'apps/clinic/patients/dtos/patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(PatientsRepository)
    private patientsRepository: PatientsRepository,
  ) {}
  async getPatient(user: JwtPayload): Promise<PatientEntity> {
    const found = await this.patientsRepository.findOne({
      where: { userId: user.id },
    });

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async getPatientById(id: string): Promise<PatientEntity> {
    const found = await this.patientsRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async createPatient(profile: PatientCreateDto): Promise<PatientEntity> {
    return this.patientsRepository.createPatient(profile);
  }

  async updatePatient(id: string, dto: PatientDto): Promise<void> {
    try {
      await this.patientsRepository.update({ id }, dto);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
