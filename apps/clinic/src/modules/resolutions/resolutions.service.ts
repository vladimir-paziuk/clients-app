import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { JwtPayload } from '@vp-clients-app/common-pkg';

import { ResolutionEntity } from 'src/modules/resolutions/resolution.entity';
import { ResolutionDto } from 'src/modules/resolutions/dtos/resolution.dto';
import { ResolutionsRepository } from 'src/modules/resolutions/resolutions.repository';

import { DoctorsService } from 'src/modules/doctors/doctors.service';
import { AppointmentsService } from 'src/modules/appointments/appointments.service';

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
