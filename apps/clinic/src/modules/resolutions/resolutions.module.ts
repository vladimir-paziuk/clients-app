import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@vp-clients-app/common-pkg';

import { ClinicSharedModule } from 'src/shared/clinic.shared.module';

import { ResolutionsService } from 'src/modules/resolutions/resolutions.service';
import { ResolutionsRepository } from 'src/modules/resolutions/resolutions.repository';
import { ResolutionsController } from 'src/modules/resolutions/resolutions.controller';

import { AppointmentsService } from 'src/modules/appointments/appointments.service';
import { AppointmentsRepository } from 'src/modules/appointments/appointments.repository';

import { PatientsService } from 'src/modules/patients/patients.service';
import { PatientsRepository } from 'src/modules/patients/patients.repository';

import { DoctorsService } from 'src/modules/doctors/doctors.service';
import { DoctorsRepository } from 'src/modules/doctors/doctors.repository';

@Module({
  imports: [
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
    AppointmentsService,
    DoctorsService,
    PatientsService,
  ],
})
export class ResolutionsModule {}
