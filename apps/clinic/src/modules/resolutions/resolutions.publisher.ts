import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { EventsEnum } from '@vp-clients-app/common-pkg';

@Injectable()
export class ResolutionsPublisher {
  constructor(
    @Inject('RESOLUTIONS_CLIENT_KAFKA') private readonly client: ClientKafka,
  ) {}

  create(userId: string, payload): void {
    this.client.emit(EventsEnum.clinicResolutionCreated, {
      userId,
      payload,
    });
  }
}
