import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { TypeOrmExModule } from '@vp-clients-app/common-pkg';
import { JwtStrategy } from '@vp-clients-app/common-pkg';
import { CryptService } from '@vp-clients-app/common-pkg';

import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';

import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';

import { RolesService } from 'src/roles/roles.service';
import { RolesRepository } from 'src/roles/roles.repository';

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
      // ProfilesRepository,
      // PatientsRepository,
    ]),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
    UsersService,
    RolesService,
    // ProfilesService,
    // PatientsService,
    CryptService,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
