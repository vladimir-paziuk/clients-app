import { Repository } from 'typeorm';
import { CustomRepository } from 'src/common/database/typeorm-ex.decorator';
import { AppointmentEntity } from 'src/appointments/appointment.entity';
import { AppointmentDto } from 'src/appointments/dtos/appointment.dto';

// @EntityRepository is deprecated, see module description
@CustomRepository(AppointmentEntity)
export class AppointmentsRepository extends Repository<AppointmentEntity> {
  async createAppointment(
    dto: AppointmentDto,
    patientId: string,
  ): Promise<AppointmentEntity> {
    const { reason, reservedAt, doctorId } = dto;
    const entity = this.create({ reason, reservedAt, doctorId, patientId });
    return this.save(entity);
  }
}
