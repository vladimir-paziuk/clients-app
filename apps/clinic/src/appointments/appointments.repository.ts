import { Repository } from 'typeorm';
import { CustomRepository } from '@vp-clients-app/common-pkg';
import { AppointmentEntity } from 'src/appointments/appointment.entity';
import { AppointmentDto } from 'src/appointments/dtos/appointment.dto';

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
