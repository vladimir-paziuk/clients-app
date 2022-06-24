import { Repository } from 'typeorm';
import { CustomRepository } from 'apps/common/database/typeorm-ex.decorator';

import { ResolutionEntity } from 'apps/clinic/resolutions/resolution.entity';
import { ResolutionDto } from 'apps/clinic/resolutions/dtos/resolution.dto';

// @EntityRepository is deprecated, see module description
@CustomRepository(ResolutionEntity)
export class ResolutionsRepository extends Repository<ResolutionEntity> {
  async createResolution(
    dto: ResolutionDto,
    doctorId: string,
    patientId: string,
  ): Promise<ResolutionEntity> {
    const { summary, appointmentId } = dto;

    const entity = this.create({
      summary,
      appointmentId,
      patientId,
      doctorId,
    });

    return this.save(entity);
  }
}
