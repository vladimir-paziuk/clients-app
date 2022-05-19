import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { TypeOrmExModule } from 'common/database/typeorm-ex.module';
import { JwtStrategy } from 'common/jwt/jwt.strategy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from './users.repository';

import { ProfilesService } from 'profiles/profiles.service';
import { ProfilesRepository } from 'profiles/profiles.repository';

import { PatientsRepository } from 'patients/patients.repository';
import { PatientsService } from 'patients/patients.service';

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
      UsersRepository,
      ProfilesRepository,
      PatientsRepository,
    ]),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, ProfilesService, PatientsService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
