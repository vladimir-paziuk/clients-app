import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientsRepository } from 'patients/patients.repository';
import { PatientEntity } from 'patients/patient.entity';
import { PatientCreateDto, PatientDto } from 'patients/dtos/patient.dto';
import { JwtPayload } from 'common/jwt/jwt.strategy';

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

    if (found) {
      return found;
    }
    throw new NotFoundException();
  }

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
