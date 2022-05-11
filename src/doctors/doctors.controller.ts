import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { AuthGuard } from '@nestjs/passport';
import { DoctorEntity } from './doctor.entity';
import { DoctorDto } from './dtos/doctorDto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AUTH_BEARER_DEFAULT } from 'common/swagger/swagger.config';
import { swaggerApiErrorResponse } from 'common/swagger/swagger-api-error-response';
import { DoctorQueryDto } from './dtos/doctorQueryDto';

@ApiBearerAuth(AUTH_BEARER_DEFAULT)
@ApiTags('Doctors')
@Controller('doctors')
@UseGuards(AuthGuard())
export class DoctorsController {
  constructor(private doctorsService: DoctorsService) {}

  @ApiOkResponse({
    type: [DoctorEntity],
    description: 'Get all doctors',
  })
  @swaggerApiErrorResponse()
  @Get()
  getDoctors(@Query() query: DoctorQueryDto): Promise<DoctorEntity[]> {
    return this.doctorsService.getData(query);
  }

  @ApiOkResponse({
    type: DoctorEntity,
    description: 'Get selected doctor',
  })
  @swaggerApiErrorResponse()
  @Get('/:id')
  getDoctorById(@Param('id') id: string): Promise<DoctorEntity> {
    return this.doctorsService.getEntityById(id);
  }

  @ApiOkResponse({
    type: DoctorEntity,
    description: 'Create doctor',
  })
  @swaggerApiErrorResponse()
  @Post()
  createDoctor(@Body() body: DoctorDto): Promise<DoctorEntity> {
    return this.doctorsService.createEntity(body);
  }

  @ApiOkResponse({
    type: DoctorEntity,
    description: 'Update doctor',
  })
  @swaggerApiErrorResponse()
  @Patch('/:id')
  updateDoctorById(
    @Param('id') id: string,
    @Body('desc') desc: string,
  ): Promise<DoctorEntity> {
    return this.doctorsService.updateDoctorById(id, desc);
  }

  @ApiOkResponse({
    description: 'Delete doctor',
  })
  @swaggerApiErrorResponse()
  @Delete('/:id')
  deleteDoctorById(@Param('id') id: string): Promise<void> {
    return this.doctorsService.deleteEntityById(id);
  }
}
