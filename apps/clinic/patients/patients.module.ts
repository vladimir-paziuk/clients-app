import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { TypeOrmExModule } from '@vp-clients-app/common-pkg';

import { PatientsService } from 'apps/clinic/patients/patients.service';
import { PatientsController } from 'apps/clinic/patients/patients.controller';
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
    TypeOrmExModule.forCustomRepository([PatientsRepository]),
  ],
  providers: [PatientsService],
  controllers: [PatientsController],
})
export class PatientsModule {}
