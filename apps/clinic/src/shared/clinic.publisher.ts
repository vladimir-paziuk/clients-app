import { Injectable } from '@nestjs/common';

import { EventsEnum, KafkaClientService } from '@vp-clients-app/common-pkg';

@Injectable()
export class ClinicPublisher {
  constructor(private client: KafkaClientService) {}

  createResolution(userId: string, payload): void {
    this.client.emit(EventsEnum.clinicResolutionCreated, {
      userId,
      payload,
    });
  }

  createAppointment(userId: string, payload): void {
    this.client.emit(EventsEnum.clinicAppointmentCreated, {
      userId,
      payload,
    });
  }
}
