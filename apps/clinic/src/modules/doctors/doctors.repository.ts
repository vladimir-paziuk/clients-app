import { Repository } from 'typeorm';
import { CustomRepository } from '@vp-clients-app/common-pkg';
import { DoctorEntity } from 'src/modules/doctors/doctor.entity';
import { DoctorQueryDto } from 'src/modules/doctors/dtos/doctor-query.dto';
import { DoctorDto } from 'src/modules/doctors/dtos/doctor.dto';

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
    const { search, offset, limit, sortBy, sortDirection = 'ASC' } = params;

    if (search) {
      query.andWhere('(LOWER(doctor.specialization) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    }
    if (sortBy) {
      query.orderBy(`doctor.${sortBy}`, sortDirection);
    }
    if (offset) {
      query.offset(offset);
    }
    if (limit) {
      query.limit(limit);
    }
    return await query.getMany();
  }
}
