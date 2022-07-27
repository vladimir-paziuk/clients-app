import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TypeOrmExModule } from '@vp-clients-app/common-pkg';

import { ClinicSharedModule } from 'src/shared/clinic.shared.module';

import { ResolutionsService } from 'src/modules/resolutions/resolutions.service';
import { ResolutionsRepository } from 'src/modules/resolutions/resolutions.repository';
import { ResolutionsController } from 'src/modules/resolutions/resolutions.controller';
import { ResolutionsPublisher } from 'src/modules/resolutions/resolutions.publisher';

import { AppointmentsService } from 'src/modules/appointments/appointments.service';
import { AppointmentsRepository } from 'src/modules/appointments/appointments.repository';

import { PatientsService } from 'src/modules/patients/patients.service';
import { PatientsRepository } from 'src/modules/patients/patients.repository';

import { DoctorsService } from 'src/modules/doctors/doctors.service';
import { DoctorsRepository } from 'src/modules/doctors/doctors.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppointmentsPublisher } from 'src/modules/appointments/appointments.publisher';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'RESOLUTIONS_CLIENT_KAFKA',
        useFactory: (config: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'CLINIC_RESOLUTIONS_KAFKA_CLIENT_ID',
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
      ResolutionsRepository,
      AppointmentsRepository,
      DoctorsRepository,
      PatientsRepository,
    ]),
  ],
  controllers: [ResolutionsController],
  providers: [
    ResolutionsService,
    ResolutionsPublisher,
    AppointmentsService,
    AppointmentsPublisher,
    DoctorsService,
    PatientsService,
  ],
})
export class ResolutionsModule {}
