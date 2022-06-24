import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { TypeOrmExModule } from '@vp-clients-app/common-pkg';
import { JwtStrategy } from '@vp-clients-app/common-pkg';

import { ProfilesController } from 'apps/profiles/profiles.controller';
import { ProfilesService } from 'apps/profiles/profiles.service';
import { ProfilesRepository } from 'apps/profiles/profiles.repository';

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
    TypeOrmExModule.forCustomRepository([ProfilesRepository]),
  ],
  controllers: [ProfilesController],
  providers: [JwtStrategy, ProfilesService],
})
export class ProfilesModule {}
