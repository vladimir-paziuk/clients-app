import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { JwtPayload } from '@vp-clients-app/common-pkg';

import { AppointmentEntity } from 'apps/clinic/appointments/appointment.entity';
import { AppointmentDto } from 'apps/clinic/appointments/dtos/appointment.dto';
import { AppointmentsRepository } from 'apps/clinic/appointments/appointments.repository';

import { DoctorsService } from 'apps/clinic/doctors/doctors.service';
import { PatientsService } from 'apps/clinic/patients/patients.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(AppointmentsRepository)
    private appointmentsRepository: AppointmentsRepository,
    private doctorsService: DoctorsService,
    private patientsService: PatientsService,
  ) {}

  async createAppointment(
    dto: AppointmentDto,
    user: JwtPayload,
  ): Promise<AppointmentEntity> {
    const patient = await this.patientsService.getPatient(user);
    return this.appointmentsRepository.createAppointment(dto, patient.id);
  }

  async getAppointments(user: JwtPayload): Promise<AppointmentEntity[]> {
    // TODO: Handle not found doctor error
    const doctor = await this.doctorsService.getDoctorByUserId(user.id);

    return this.appointmentsRepository.find({
      where: { doctorId: doctor.id },
    });
  }

  async getAppointmentById(id: string): Promise<AppointmentEntity> {
    const found = this.appointmentsRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
}
