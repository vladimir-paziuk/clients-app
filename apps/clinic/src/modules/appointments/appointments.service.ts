import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientKafka } from '@nestjs/microservices';

import {
  EventsEnum,
  JwtPayload,
  NotificationsEnum,
} from '@vp-clients-app/common-pkg';

import { AppointmentEntity } from 'src/modules/appointments/appointment.entity';
import { AppointmentDto } from 'src/modules/appointments/dtos/appointment.dto';
import { AppointmentsRepository } from 'src/modules/appointments/appointments.repository';

import { DoctorsService } from 'src/modules/doctors/doctors.service';
import { PatientsService } from 'src/modules/patients/patients.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(AppointmentsRepository)
    private appointmentsRepository: AppointmentsRepository,
    private doctorsService: DoctorsService,
    private patientsService: PatientsService,
    @Inject('CLINIC_KAFKA_CLIENT') private readonly client: ClientKafka,
  ) {}

  async createAppointment(
    dto: AppointmentDto,
    user: JwtPayload,
  ): Promise<AppointmentEntity> {
    const patient = await this.patientsService.getPatient(user);
    const payload = await this.appointmentsRepository.createAppointment(
      dto,
      patient.id,
    );
    const doctor = await this.doctorsService.getDoctorById(payload.doctorId);

    this.client.emit(EventsEnum.notificationCreated, {
      type: NotificationsEnum.appointment,
      userId: doctor.userId,
      payload,
    });
    return payload;
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
