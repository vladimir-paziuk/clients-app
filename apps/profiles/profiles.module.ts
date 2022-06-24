import { Module } from '@nestjs/common';

import { AuthModule } from 'apps/auth/auth.module';
import { TypeOrmExModule } from '@vp-clients-app/common-pkg';

import { ProfilesController } from 'apps/profiles/profiles.controller';
import { ProfilesService } from 'apps/profiles/profiles.service';
import { ProfilesRepository } from 'apps/profiles/profiles.repository';

// TypeOrmExModule.forCustomRepository uses instead TypeOrmExModule.forFeature for
// resolve @EntityRepository deprecated issue, instead use @CustomRepository
// Implement solution from https://gist.github.com/anchan828/9e569f076e7bc18daf21c652f7c3d012
// Also install @nestjs/typeorm@next

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([ProfilesRepository]),
    AuthModule,
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
