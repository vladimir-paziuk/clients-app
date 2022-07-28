import { Injectable } from '@nestjs/common';

import { EventsEnum, KafkaClientService } from '@vp-clients-app/common-pkg';

@Injectable()
export class ResolutionsPublisher {
  constructor(private client: KafkaClientService) {}

  create(userId: string, payload): void {
    this.client.emit(EventsEnum.clinicResolutionCreated, {
      userId,
      payload,
    });
  }
}
