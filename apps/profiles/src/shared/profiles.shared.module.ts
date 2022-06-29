import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { JwtStrategy } from '@vp-clients-app/common-pkg';

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
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class ProfilesSharedModule {}
