import { Injectable } from '@nestjs/common';
import { EventsEnum } from '@vp-clients-app/common-pkg';

import { KafkaClientService } from 'src/modules/kafka-client/kafka-client.service';

@Injectable()
export class AppointmentsPublisher {
  constructor(private client: KafkaClientService) {}

  create(userId: string, payload): void {
    this.client.emit(EventsEnum.clinicAppointmentCreated, {
      userId,
      payload,
    });
  }
}
