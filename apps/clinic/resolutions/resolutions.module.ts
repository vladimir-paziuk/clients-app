import { Module } from '@nestjs/common';

import { AuthModule } from 'apps/auth/auth.module';
import { TypeOrmExModule } from '@vp-clients-app/common-pkg';

import { ResolutionsService } from 'apps/clinic/resolutions/resolutions.service';
import { ResolutionsController } from 'apps/clinic/resolutions/resolutions.controller';
import { ResolutionsRepository } from 'apps/clinic/resolutions/resolutions.repository';

import { DoctorsService } from 'apps/clinic/doctors/doctors.service';
import { DoctorsRepository } from 'apps/clinic/doctors/doctors.repository';

import { AppointmentsService } from 'apps/clinic/appointments/appointments.service';
import { AppointmentsRepository } from 'apps/clinic/appointments/appointments.repository';
import { PatientsService } from 'apps/clinic/patients/patients.service';
import { PatientsRepository } from 'apps/clinic/patients/patients.repository';

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
