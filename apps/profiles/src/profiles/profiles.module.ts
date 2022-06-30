import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@vp-clients-app/common-pkg';

import { ProfilesSharedModule } from 'src/shared/profiles.shared.module';

import { ProfilesController } from 'src/profiles/profiles.controller';
import { ProfilesService } from 'src/profiles/profiles.service';
import { ProfilesRepository } from 'src/profiles/profiles.repository';

// TypeOrmExModule.forCustomRepository uses instead TypeOrmExModule.forFeature for
// resolve @EntityRepository deprecated issue, instead use @CustomRepository
// Implement solution from https://gist.github.com/anchan828/9e569f076e7bc18daf21c652f7c3d012
// Also install @nestjs/typeorm@next

@Module({
  imports: [
    ProfilesSharedModule,
    TypeOrmExModule.forCustomRepository([ProfilesRepository]),
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}