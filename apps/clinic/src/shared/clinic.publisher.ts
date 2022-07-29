import { Injectable } from '@nestjs/common';

import { EventsEnum, KafkaClientService } from '@vp-clients-app/common-pkg';

import { ResolutionEntity } from 'src/modules/resolutions/resolution.entity';
import { AppointmentEntity } from 'src/modules/appointments/appointment.entity';

@Injectable()
export class ClinicPublisher {
  constructor(private client: KafkaClientService) {}

  createResolution(userId: string, payload: ResolutionEntity): void {
    this.client.emit(EventsEnum.clinicResolutionCreated, {
      userId,
      payload,
    });
  }

  createAppointment(userId: string, payload: AppointmentEntity): void {
    this.client.emit(EventsEnum.clinicAppointmentCreated, {
      userId,
      payload,
    });
  }
}
