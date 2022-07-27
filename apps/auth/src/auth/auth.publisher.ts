import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { EventsEnum } from '@vp-clients-app/common-pkg';

@Injectable()
export class AuthPublisher {
  constructor(
    @Inject('AUTH_CLIENT_KAFKA') private readonly client: ClientKafka,
  ) {}

  create(payload: { userId: string }): void {
    this.client.emit(EventsEnum.authUserCreated, payload);
  }
}
