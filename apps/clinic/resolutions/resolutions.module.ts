import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('AUTH_SECRET_KEY'),
        signOptions: {
          expiresIn: +config.get('AUTH_TOKEN_EXPIRE_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
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
