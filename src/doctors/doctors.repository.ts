import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { CustomRepository } from 'common/database/typeorm-ex.decorator';

@Entity()
export class DoctorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  desc?: string;
}

export type DoctorDto = Pick<DoctorEntity, 'name' | 'desc'>;

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
