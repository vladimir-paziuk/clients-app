import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { JwtPayload } from 'apps/common/jwt/jwt.strategy';

import { ResolutionEntity } from 'apps/clinic/resolutions/resolution.entity';
import { ResolutionDto } from 'apps/clinic/resolutions/dtos/resolution.dto';
import { ResolutionsRepository } from 'apps/clinic/resolutions/resolutions.repository';

import { DoctorsService } from 'apps/clinic/doctors/doctors.service';
import { AppointmentsService } from 'apps/clinic/appointments/appointments.service';

@Injectable()
export class ResolutionsService {
  constructor(
    @InjectRepository(ResolutionsRepository)
    private resolutionsRepository: ResolutionsRepository,
    private doctorsService: DoctorsService,
    private appointmentsService: AppointmentsService,
  ) {}

  async createResolution(
    dto: ResolutionDto,
    user: JwtPayload,
  ): Promise<ResolutionEntity> {
    const doctor = await this.doctorsService.getDoctorByUserId(user.id);
    const appointment = await this.appointmentsService.getAppointmentById(
      dto.appointmentId,
    );

    return this.resolutionsRepository.createResolution(
      dto,
      doctor.id,
      appointment.patientId,
    );
  }
}
