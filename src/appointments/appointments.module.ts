import { Module } from '@nestjs/common';

import { TypeOrmExModule } from 'src/common/database/typeorm-ex.module';
import { AppointmentsRepository } from 'src/appointments/appointments.repository';

import { AuthModule } from 'src/auth/auth.module';

import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';

import { DoctorsService } from 'src/doctors/doctors.service';
import { DoctorsRepository } from 'src/doctors/doctors.repository';

import { PatientsService } from 'src/patients/patients.service';
import { PatientsRepository } from 'src/patients/patients.repository';

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
