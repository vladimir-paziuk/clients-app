import { Repository } from 'typeorm';
import { CustomRepository } from '@vp-clients-app/common-pkg';

import { PatientEntity } from 'src/modules/patients/patient.entity';
import { PatientCreateDto } from 'src/modules/patients/dtos/patient.dto';

// @EntityRepository is deprecated, see module description
@CustomRepository(PatientEntity)
export class PatientsRepository extends Repository<PatientEntity> {
  async createPatient(profile: PatientCreateDto): Promise<PatientEntity> {
    const entity = this.create(profile);
    return await this.save(entity);
  }
}
