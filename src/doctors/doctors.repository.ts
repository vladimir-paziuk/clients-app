import { Repository } from 'typeorm';
import { CustomRepository } from 'common/database/typeorm-ex.decorator';
import { DoctorEntity } from './doctor.entity';

// @EntityRepository is deprecated, see module description
@CustomRepository(DoctorEntity)
export class DoctorsRepository extends Repository<DoctorEntity> {
  async getDoctors(search: string): Promise<DoctorEntity[]> {
    const query = this.createQueryBuilder('doctor');

    if (search) {
      query.andWhere(
        '(LOWER(doctor.name) LIKE LOWER(:search) OR LOWER(doctor.desc) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    return await query.getMany();
  }
}
