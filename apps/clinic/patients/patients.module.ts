import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@vp-clients-app/common-pkg';
import { AuthModule } from 'apps/auth/auth.module';

import { PatientsService } from 'apps/clinic/patients/patients.service';
import { PatientsController } from 'apps/clinic/patients/patients.controller';
import { PatientsRepository } from 'apps/clinic/patients/patients.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([PatientsRepository]),
    AuthModule,
  ],
  providers: [PatientsService],
  controllers: [PatientsController],
})
export class PatientsModule {}
