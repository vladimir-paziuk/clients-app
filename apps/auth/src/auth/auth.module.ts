import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';

import {
  CryptService,
  JwtStrategy,
  TypeOrmExModule,
} from '@vp-clients-app/common-pkg';

import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthPublisher } from 'src/auth/auth.publisher';

import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';

import { RolesService } from 'src/roles/roles.service';
import { RolesRepository } from 'src/roles/roles.repository';

import { ClinicClientService } from 'src/http-client/clinic.client.service';
import { ProfilesClientService } from 'src/http-client/profiles.client.service';

// TypeOrmExModule.forCustomRepository uses instead TypeOrmExModule.forFeature for
// resolve @EntityRepository deprecated issue, instead use @CustomRepository
// Implement solution from https://gist.github.com/anchan828/9e569f076e7bc18daf21c652f7c3d012
// Also install @nestjs/typeorm@next

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'AUTH_CLIENT_KAFKA',
        useFactory: (config: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: config.get('KAFKA_CLIENT'),
              brokers: config.get('KAFKA_BROKERS').split(' '),
            },
            consumer: {
              groupId: config.get('KAFKA_GROUP'),
            },
          },
        }),
        inject: [ConfigService],
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
    AuthPublisher,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
