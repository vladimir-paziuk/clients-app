import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { SwaggerApiErrorResponse } from '@vp-clients-app/common-pkg';
import { AUTH_BEARER_DEFAULT } from '@vp-clients-app/common-pkg';
import { GetUser } from '@vp-clients-app/common-pkg';
import { JwtPayload } from '@vp-clients-app/common-pkg';

import { PatientEntity } from 'src/modules/patients/patient.entity';
import { PatientsService } from 'src/modules/patients/patients.service';
import { PatientDto } from 'src/modules/patients/dtos/patient.dto';

@ApiBearerAuth(AUTH_BEARER_DEFAULT)
@ApiTags('Patients')
@Controller('patients')
@UseGuards(AuthGuard())
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @ApiOperation({
    summary: 'Get my profile patient data.',
    description: 'Returns patient data based on logged user credentials.',
  })
  @ApiOkResponse({
    type: PatientEntity,
  })
  @SwaggerApiErrorResponse()
  @Get('/me')
  getPatientByUser(@GetUser() user: JwtPayload): Promise<PatientEntity> {
    return this.patientsService.getPatient(user);
  }

  @ApiOperation({
    summary: 'Get selected patient.',
    description: 'Returns patient data based on id.',
  })
  @ApiOkResponse({
    type: PatientEntity,
  })
  @SwaggerApiErrorResponse()
  @Get('/:id')
  getPatientById(@Param('id') id: string): Promise<PatientEntity> {
    return this.patientsService.getPatientById(id);
  }

  @ApiOperation({
    summary: 'Update selected patient.',
    description: 'Update patient instance based on id and PatientDto.',
  })
  @SwaggerApiErrorResponse()
  @Patch('/:id')
  updatePatient(
    @Param('id') id: string,
    @Body() body: PatientDto,
  ): Promise<void> {
    return this.patientsService.updatePatient(id, body);
  }
}
