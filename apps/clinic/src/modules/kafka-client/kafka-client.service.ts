import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { KAFKA_CLIENT } from 'src/modules/kafka-client/kafka-client.constants';

@Injectable()
export class KafkaClientService {
  constructor(@Inject(KAFKA_CLIENT) private client: ClientKafka) {}

  emit(pattern: string, payload: any) {
    this.client.emit(pattern, payload);
  }
}
