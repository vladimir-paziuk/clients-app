import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SwaggerApiErrorResponse } from 'common/swagger/swagger-api-error-response';
import { PatientEntity } from 'patients/patient.entity';
import { PatientsService } from 'patients/patients.service';
import { PatientDto } from 'patients/dtos/patient.dto';
import { AUTH_BEARER_DEFAULT } from 'common/swagger/swagger.config';
import { ProfileEntity } from 'profiles/profile.entity';
import { GetUser } from 'common/jwt/get-user.guard';
import { JwtPayload } from 'common/jwt/jwt.strategy';

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
    type: ProfileEntity,
  })
  @SwaggerApiErrorResponse()
  @Get('/me')
  getProfileByUser(@GetUser() user: JwtPayload): Promise<PatientEntity> {
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
