import { Repository } from 'typeorm';
import { CustomRepository } from 'common/database/typeorm-ex.decorator';
import { PatientEntity } from 'patients/patient.entity';
import { PatientCreateDto } from 'patients/dtos/patient.dto';

// @EntityRepository is deprecated, see module description
@CustomRepository(PatientEntity)
export class PatientsRepository extends Repository<PatientEntity> {
  async createPatient(profile: PatientCreateDto): Promise<PatientEntity> {
    const entity = this.create(profile);
    return await this.save(entity);
  }
}
