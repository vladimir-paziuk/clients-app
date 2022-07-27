import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ClinicSharedModule } from 'src/shared/clinic.shared.module';

import { TypeOrmExModule } from '@vp-clients-app/common-pkg';
import { AppointmentsRepository } from 'src/modules/appointments/appointments.repository';

import { AppointmentsController } from 'src/modules/appointments/appointments.controller';
import { AppointmentsService } from 'src/modules/appointments/appointments.service';
import { AppointmentsPublisher } from 'src/modules/appointments/appointments.publisher';

import { DoctorsService } from 'src/modules/doctors/doctors.service';
import { DoctorsRepository } from 'src/modules/doctors/doctors.repository';

import { PatientsService } from 'src/modules/patients/patients.service';
import { PatientsRepository } from 'src/modules/patients/patients.repository';

// TypeOrmExModule.forCustomRepository uses instead TypeOrmExModule.forFeature for
// resolve @EntityRepository deprecated issue, instead use @CustomRepository
// Implement solution from https://gist.github.com/anchan828/9e569f076e7bc18daf21c652f7c3d012
// Also install @nestjs/typeorm@next

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'APPOINTMENTS_CLIENT_KAFKA',
        useFactory: (config: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'CLINIC_APPOINTMENTS_KAFKA_CLIENT_ID',
              brokers: [config.get('KAFKA_BROKER')],
            },
            consumer: {
              groupId: 'CLINIC_APP_CONSUMER',
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
    ClinicSharedModule,
    TypeOrmExModule.forCustomRepository([
      AppointmentsRepository,
      DoctorsRepository,
      PatientsRepository,
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [
    AppointmentsService,
    DoctorsService,
    PatientsService,
    AppointmentsPublisher,
  ],
})
export class AppointmentsModule {}
