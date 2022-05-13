import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientsRepository } from 'patients/patients.repository';
import { PatientEntity } from 'patients/patient.entity';
import { PatientCreateDto, PatientDto } from 'patients/dtos/patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(PatientsRepository)
    private patientsRepository: PatientsRepository,
  ) {}
  async getPatientById(id: string): Promise<PatientEntity> {
    const found = await this.patientsRepository.findOne({
      where: { id },
    });

    if (found) {
      return found;
    }
    throw new NotFoundException();
  }

  async createPatient(profile: PatientCreateDto): Promise<PatientEntity> {
    const entity = await this.patientsRepository.createPatient(profile);

    if (entity) {
      return entity;
    }
    throw new NotFoundException();
  }

  async updatePatient(id: string, dto: PatientDto): Promise<PatientEntity> {
    const entity = await this.getPatientById(id);
    const updated = { ...entity, ...dto };

    await this.patientsRepository.save(updated);

    return updated;
  }
}
