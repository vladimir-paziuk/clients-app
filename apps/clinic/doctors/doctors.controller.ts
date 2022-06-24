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
import { DoctorsService } from 'apps/clinic/doctors/doctors.service';
import { AuthGuard } from '@nestjs/passport';
import { DoctorEntity } from 'apps/clinic/doctors/doctor.entity';
import { DoctorDto } from 'apps/clinic/doctors/dtos/doctor.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AUTH_BEARER_DEFAULT } from '@vp-clients-app/common-pkg';
import { SwaggerApiErrorResponse } from '@vp-clients-app/common-pkg';
import { DoctorQueryDto } from 'apps/clinic/doctors/dtos/doctor-query.dto';

@ApiBearerAuth(AUTH_BEARER_DEFAULT)
@ApiTags('Doctors')
@Controller('doctors')
@UseGuards(AuthGuard())
export class DoctorsController {
  constructor(private doctorsService: DoctorsService) {}

  @ApiOperation({
    summary: 'Get all available doctors.',
    description: 'Returns doctors data based on search params.',
  })
  @ApiOkResponse({
    type: [DoctorEntity],
  })
  @SwaggerApiErrorResponse()
  @Get()
  getDoctors(@Query() query: DoctorQueryDto): Promise<DoctorEntity[]> {
    return this.doctorsService.getDoctors(query);
  }

  @ApiOperation({
    summary: 'Get selected doctor.',
    description: 'Returns doctor data based on id.',
  })
  @ApiOkResponse({
    type: DoctorEntity,
  })
  @SwaggerApiErrorResponse()
  @Get('/:id')
  getDoctorById(@Param('id') id: string): Promise<DoctorEntity> {
    return this.doctorsService.getDoctorById(id);
  }

  @ApiOperation({
    summary: 'Create new doctor instance.',
    description: 'Returns and create doctor data based on DoctorDto.',
  })
  @ApiOkResponse({
    type: DoctorEntity,
    description: 'Create doctor',
  })
  @SwaggerApiErrorResponse()
  @Post()
  createDoctor(@Body() body: DoctorDto): Promise<DoctorEntity> {
    return this.doctorsService.createDoctor(body);
  }

  @ApiOperation({
    summary: 'Update selected doctor.',
    description: 'Update doctor instance based on id and DoctorDto.',
  })
  @ApiOkResponse({
    type: DoctorEntity,
    description: 'Update doctor',
  })
  @SwaggerApiErrorResponse()
  @Patch('/:id')
  updateDoctorById(
    @Param('id') id: string,
    @Body() body: DoctorDto,
  ): Promise<void> {
    return this.doctorsService.updateDoctorById(id, body);
  }

  @ApiOperation({
    summary: 'Remove doctor instance.',
    description: 'Remove doctor instance based on id.',
  })
  @ApiOkResponse({
    description: 'Delete doctor',
  })
  @SwaggerApiErrorResponse()
  @Delete('/:id')
  deleteDoctorById(@Param('id') id: string): Promise<void> {
    return this.doctorsService.deleteDoctorById(id);
  }
}
