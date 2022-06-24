import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { JwtStrategy, TypeOrmExModule } from '@vp-clients-app/common-pkg';

import { ResolutionsService } from 'src/resolutions/resolutions.service';
import { ResolutionsRepository } from 'src/resolutions/resolutions.repository';
import { ResolutionsController } from 'src/resolutions/resolutions.controller';

import { AppointmentsService } from 'src/appointments/appointments.service';
import { AppointmentsRepository } from 'src/appointments/appointments.repository';

import { PatientsService } from 'src/patients/patients.service';
import { PatientsRepository } from 'src/patients/patients.repository';

import { DoctorsService } from 'src/doctors/doctors.service';
import { DoctorsRepository } from 'src/doctors/doctors.repository';

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
  controllers: [ResolutionsController],
  providers: [
    JwtStrategy,
    ResolutionsService,
    AppointmentsService,
    DoctorsService,
    PatientsService,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class ResolutionsModule {}
