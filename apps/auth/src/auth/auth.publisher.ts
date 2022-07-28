import { Injectable } from '@nestjs/common';

import { EventsEnum, KafkaClientService } from '@vp-clients-app/common-pkg';

@Injectable()
export class AuthPublisher {
  constructor(private client: KafkaClientService) {}

  create(payload: { userId: string }): void {
    this.client.emit(EventsEnum.authUserCreated, payload);
  }
}
