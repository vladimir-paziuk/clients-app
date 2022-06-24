import { Repository } from 'typeorm';
import { CustomRepository } from 'apps/common/database/typeorm-ex.decorator';
import { AppointmentEntity } from 'apps/clinic/appointments/appointment.entity';
import { AppointmentDto } from 'apps/clinic/appointments/dtos/appointment.dto';

// @EntityRepository is deprecated, see module description
@CustomRepository(AppointmentEntity)
export class AppointmentsRepository extends Repository<AppointmentEntity> {
  async createAppointment(
    dto: AppointmentDto,
    patientId: string,
  ): Promise<AppointmentEntity> {
    const { reason, reservationDate, doctorId } = dto;
    const entity = this.create({
      reason,
      doctorId,
      patientId,
      reservationDate,
    });
    return this.save(entity);
  }
}
