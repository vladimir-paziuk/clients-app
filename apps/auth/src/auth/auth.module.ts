import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { TypeOrmExModule } from '@vp-clients-app/common-pkg';
import { JwtStrategy } from '@vp-clients-app/common-pkg';
import { CryptService } from '@vp-clients-app/common-pkg';

import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';

import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';

import { RolesService } from 'src/roles/roles.service';
import { RolesRepository } from 'src/roles/roles.repository';

import { ClinicClientService } from 'src/httpClient/clinic.client.service';
import { ProfilesClientService } from 'src/httpClient/profiles.client.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'AUTH_SERVICE_CLIENT_ID',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'CLIENTS_APP_CONSUMER',
          },
        },
      },
    ]),
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
    HttpModule,
    TypeOrmExModule.forCustomRepository([UsersRepository, RolesRepository]),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
    UsersService,
    RolesService,
    ClinicClientService,
    ProfilesClientService,
    CryptService,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
