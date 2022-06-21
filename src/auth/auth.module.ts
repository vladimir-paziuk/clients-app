import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { TypeOrmExModule } from 'src/common/database/typeorm-ex.module';
import { JwtStrategy } from 'src/common/jwt/jwt.strategy';
import { CryptService } from 'src/common/jwt/crypt.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsersService } from 'src/auth/users.service';
import { UsersRepository } from './users.repository';

import { RolesService } from 'src/auth/roles.service';
import { RolesRepository } from 'src/auth/roles.repository';

import { ProfilesService } from 'src/profiles/profiles.service';
import { ProfilesRepository } from 'src/profiles/profiles.repository';

import { PatientsService } from 'src/patients/patients.service';
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
