import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { TypeOrmExModule } from '@vp-clients-app/common-pkg';
import { JwtStrategy } from '@vp-clients-app/common-pkg';
import { CryptService } from '@vp-clients-app/common-pkg';

import { AuthController } from 'apps/auth/src/auth.controller';
import { AuthService } from 'apps/auth/src/auth.service';

import { UsersService } from 'apps/auth/src/users.service';
import { UsersRepository } from 'apps/auth/src/users.repository';

import { RolesService } from 'apps/auth/src/roles.service';
import { RolesRepository } from 'apps/auth/src/roles.repository';

import { ProfilesService } from 'apps/profiles/profiles.service';
import { ProfilesRepository } from 'apps/profiles/profiles.repository';

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
      UsersRepository,
      RolesRepository,
      ProfilesRepository,
      PatientsRepository,
    ]),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
    UsersService,
    RolesService,
    ProfilesService,
    PatientsService,
    CryptService,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
