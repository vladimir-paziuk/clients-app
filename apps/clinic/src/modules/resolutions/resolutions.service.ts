import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientKafka } from '@nestjs/microservices';

import {
  EventsEnum,
  JwtPayload,
  NotificationsEnum,
} from '@vp-clients-app/common-pkg';

import { ResolutionEntity } from 'src/modules/resolutions/resolution.entity';
import { ResolutionDto } from 'src/modules/resolutions/dtos/resolution.dto';
import { ResolutionsRepository } from 'src/modules/resolutions/resolutions.repository';

import { AppointmentsService } from 'src/modules/appointments/appointments.service';
import { DoctorsService } from 'src/modules/doctors/doctors.service';
import { PatientsService } from 'src/modules/patients/patients.service';

@Injectable()
export class ResolutionsService {
  constructor(
    @InjectRepository(ResolutionsRepository)
    private resolutionsRepository: ResolutionsRepository,
    private doctorsService: DoctorsService,
    private patientsService: PatientsService,
    private appointmentsService: AppointmentsService,
    @Inject('CLINIC_KAFKA_CLIENT') private readonly client: ClientKafka,
  ) {}

  async createResolution(
    dto: ResolutionDto,
    user: JwtPayload,
  ): Promise<ResolutionEntity> {
    const doctor = await this.doctorsService.getDoctorByUserId(user.id);
    const appointment = await this.appointmentsService.getAppointmentById(
      dto.appointmentId,
    );
    const payload = await this.resolutionsRepository.createResolution(
      dto,
      doctor.id,
      appointment.patientId,
    );
    const patient = await this.patientsService.getPatientById(
      payload.patientId,
    );
    this.client.emit(EventsEnum.notificationCreated, {
      type: NotificationsEnum.resolution,
      userId: patient.userId,
      payload,
    });

    return payload;
  }
}
