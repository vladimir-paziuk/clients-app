import { Repository } from 'typeorm';
import { CustomRepository } from '../common/database/typeorm-ex.decorator';
import { DoctorEntity } from './doctor.entity';
import { DoctorQueryDto } from './dtos/doctor-query.dto';
import { DoctorDto } from './dtos/doctor.dto';

// @EntityRepository is deprecated, see module description
@CustomRepository(DoctorEntity)
export class DoctorsRepository extends Repository<DoctorEntity> {
  async createDoctor(data: DoctorDto): Promise<DoctorEntity> {
    const entity = this.create(data);
    await this.save(entity);
    return entity;
  }

  async getDoctors(params: DoctorQueryDto): Promise<DoctorEntity[]> {
    const query = this.createQueryBuilder('doctor');
    const { search } = params;

    if (search) {
      query.andWhere(
        '(LOWER(doctor.name) LIKE LOWER(:search) OR LOWER(doctor.desc) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    return await query.getMany();
  }
}
