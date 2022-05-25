import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/common/database/typeorm-ex.module';

import { AuthModule } from 'src/auth/auth.module';

import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { PatientsRepository } from './patients.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([PatientsRepository]),
    AuthModule,
  ],
  providers: [PatientsService],
  controllers: [PatientsController],
})
export class PatientsModule {}
