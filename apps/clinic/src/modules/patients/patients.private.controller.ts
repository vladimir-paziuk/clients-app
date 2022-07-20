import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AUTH_BEARER_DEFAULT } from '@vp-clients-app/common-pkg';

import { PatientEntity } from 'src/modules/patients/patient.entity';
import { PatientsService } from 'src/modules/patients/patients.service';
import { PatientCreateDto } from 'src/modules/patients/dtos/patient.dto';

@ApiBearerAuth(AUTH_BEARER_DEFAULT)
@ApiTags('Patients')
@Controller('patients')
@UseGuards(AuthGuard())
export class PatientsPrivateController {
  constructor(private patientsService: PatientsService) {}

  @Post('/')
  createPatient(@Body() body: PatientCreateDto): Promise<PatientEntity> {
    return this.patientsService.createPatient(body);
  }
}
