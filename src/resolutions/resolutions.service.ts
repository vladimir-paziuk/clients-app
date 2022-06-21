import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { JwtPayload } from 'src/common/jwt/jwt.strategy';

import { ResolutionEntity } from 'src/resolutions/resolution.entity';
import { ResolutionDto } from 'src/resolutions/dtos/resolution.dto';
import { ResolutionsRepository } from 'src/resolutions/resolutions.repository';

import { DoctorsService } from 'src/doctors/doctors.service';
import { AppointmentsService } from 'src/appointments/appointments.service';

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
