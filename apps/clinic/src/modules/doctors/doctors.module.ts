import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@vp-clients-app/common-pkg';

import { ClinicSharedModule } from 'src/shared/clinic.shared.module';

import { DoctorsService } from 'src/modules/doctors/doctors.service';
import { DoctorsController } from 'src/modules/doctors/doctors.controller';
import { DoctorsRepository } from 'src/modules/doctors/doctors.repository';

// TypeOrmExModule.forCustomRepository uses instead TypeOrmExModule.forFeature for
// resolve @EntityRepository deprecated issue, instead use @CustomRepository
// Implement solution from https://gist.github.com/anchan828/9e569f076e7bc18daf21c652f7c3d012
// Also install @nestjs/typeorm@next

@Module({
  imports: [
    ClinicSharedModule,
    TypeOrmExModule.forCustomRepository([DoctorsRepository]),
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}
