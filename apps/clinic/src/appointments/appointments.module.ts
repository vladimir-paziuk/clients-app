import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { JwtStrategy, TypeOrmExModule } from '@vp-clients-app/common-pkg';
import { AppointmentsRepository } from 'src/appointments/appointments.repository';

import { AppointmentsController } from 'src/appointments/appointments.controller';
import { AppointmentsService } from 'src/appointments/appointments.service';

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
      AppointmentsRepository,
      DoctorsRepository,
      PatientsRepository,
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [
    JwtStrategy,
    AppointmentsService,
    DoctorsService,
    PatientsService,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AppointmentsModule {}
