import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { KAFKA_CLIENT } from './kafka-client.constants';
import { KafkaClientService } from './kafka-client.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: KAFKA_CLIENT,
        useFactory: (config: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: config.get('KAFKA_CLIENT'),
              brokers: config.get('KAFKA_BROKERS').split(' '),
            },
            consumer: {
              groupId: config.get('KAFKA_GROUP_PUBLISHER'),
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [KafkaClientService],
  exports: [KafkaClientService],
})
export class KafkaClientModule {}
