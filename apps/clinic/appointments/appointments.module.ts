import { Module } from '@nestjs/common';

import { TypeOrmExModule } from 'apps/common/database/typeorm-ex.module';
import { AppointmentsRepository } from 'apps/clinic/appointments/appointments.repository';

import { AuthModule } from 'apps/auth/auth.module';

import { AppointmentsController } from 'apps/clinic/appointments/appointments.controller';
import { AppointmentsService } from 'apps/clinic/appointments/appointments.service';

import { DoctorsService } from 'apps/clinic/doctors/doctors.service';
import { DoctorsRepository } from 'apps/clinic/doctors/doctors.repository';

import { PatientsService } from 'apps/clinic/patients/patients.service';
import { PatientsRepository } from 'apps/clinic/patients/patients.repository';

// TypeOrmExModule.forCustomRepository uses instead TypeOrmExModule.forFeature for
// resolve @EntityRepository deprecated issue, instead use @CustomRepository
// Implement solution from https://gist.github.com/anchan828/9e569f076e7bc18daf21c652f7c3d012
// Also install @nestjs/typeorm@next

@Module({
  imports: [
    AuthModule,
    TypeOrmExModule.forCustomRepository([
      AppointmentsRepository,
      DoctorsRepository,
      PatientsRepository,
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, DoctorsService, PatientsService],
})
export class AppointmentsModule {}
