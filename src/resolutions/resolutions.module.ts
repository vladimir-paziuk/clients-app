import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmExModule } from 'src/common/database/typeorm-ex.module';

import { ResolutionsService } from './resolutions.service';
import { ResolutionsController } from './resolutions.controller';
import { ResolutionsRepository } from 'src/resolutions/resolutions.repository';

import { DoctorsService } from 'src/doctors/doctors.service';
import { DoctorsRepository } from 'src/doctors/doctors.repository';

import { AppointmentsService } from 'src/appointments/appointments.service';
import { AppointmentsRepository } from 'src/appointments/appointments.repository';
import { PatientsService } from 'src/patients/patients.service';
import { PatientsRepository } from 'src/patients/patients.repository';

@Module({
  imports: [
    AuthModule,
    TypeOrmExModule.forCustomRepository([
      ResolutionsRepository,
      AppointmentsRepository,
      DoctorsRepository,
      PatientsRepository,
    ]),
  ],
  providers: [
    ResolutionsService,
    AppointmentsService,
    DoctorsService,
    PatientsService,
  ],
  controllers: [ResolutionsController],
})
export class ResolutionsModule {}
