import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { JwtStrategy, TypeOrmExModule } from '@vp-clients-app/common-pkg';

import { PatientsService } from 'src/patients/patients.service';
import { PatientsController } from 'src/patients/patients.controller';
import { PatientsRepository } from 'src/patients/patients.repository';

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
  controllers: [PatientsController],
  providers: [JwtStrategy, PatientsService],
  exports: [JwtStrategy, PassportModule],
})
export class PatientsModule {}
