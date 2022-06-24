import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { TypeOrmExModule } from 'apps/common/database/typeorm-ex.module';
import { JwtStrategy } from 'apps/common/jwt/jwt.strategy';
import { CryptService } from 'apps/common/jwt/crypt.service';

import { AuthController } from 'apps/auth/auth.controller';
import { AuthService } from 'apps/auth/auth.service';

import { UsersService } from 'apps/auth/users.service';
import { UsersRepository } from 'apps/auth/users.repository';

import { RolesService } from 'apps/auth/roles.service';
import { RolesRepository } from 'apps/auth/roles.repository';

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
