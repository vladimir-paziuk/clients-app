import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@vp-clients-app/common-pkg';

import { ClinicSharedModule } from 'src/shared/clinic.shared.module';

import { ResolutionsService } from 'src/modules/resolutions/resolutions.service';
import { ResolutionsRepository } from 'src/modules/resolutions/resolutions.repository';
import { ResolutionsController } from 'src/modules/resolutions/resolutions.controller';
import { ResolutionsPublisher } from 'src/modules/resolutions/resolutions.publisher';

import { AppointmentsService } from 'src/modules/appointments/appointments.service';
import { AppointmentsRepository } from 'src/modules/appointments/appointments.repository';
import { AppointmentsPublisher } from 'src/modules/appointments/appointments.publisher';

import { PatientsService } from 'src/modules/patients/patients.service';
import { PatientsRepository } from 'src/modules/patients/patients.repository';

import { DoctorsService } from 'src/modules/doctors/doctors.service';
import { DoctorsRepository } from 'src/modules/doctors/doctors.repository';

import { KafkaClientModule } from 'src/modules/kafka-client/kafka-client.module';

// TypeOrmExModule.forCustomRepository uses instead TypeOrmExModule.forFeature for
// resolve @EntityRepository deprecated issue, instead use @CustomRepository
// Implement solution from https://gist.github.com/anchan828/9e569f076e7bc18daf21c652f7c3d012
// Also install @nestjs/typeorm@next

@Module({
  imports: [
    KafkaClientModule,
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
