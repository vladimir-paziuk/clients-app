import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { KAFKA_CLIENT } from './kafka-client.constants';

@Injectable()
export class KafkaClientService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject(KAFKA_CLIENT) private client: ClientKafka) {}

  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  subscribeToResponseOf(pattern: string) {
    this.client.subscribeToResponseOf(pattern);
  }

  emit(pattern: string, payload: any) {
    this.client.emit(pattern, payload);
  }

  send(pattern: string, payload: any) {
    this.client.send(pattern, payload);
  }
}
