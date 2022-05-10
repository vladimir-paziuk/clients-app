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
import { DoctorQueryDto } from './dtos/doctorQueryDto';

@ApiBearerAuth(AUTH_BEARER_DEFAULT)
@ApiTags('Doctors')
@Controller('doctors')
@UseGuards(AuthGuard())
export class DoctorsController {
  constructor(private doctorsService: DoctorsService) {}

  @ApiOkResponse({ type: [DoctorEntity] })
  @Get()
  getDoctors(@Query() query: DoctorQueryDto): Promise<DoctorEntity[]> {
    return this.doctorsService.getData(query);
  }

  @ApiOkResponse({ type: DoctorEntity })
  @Get('/:id')
  getDoctorById(@Param('id') id: string): Promise<DoctorEntity> {
    return this.doctorsService.getEntityById(id);
  }

  @ApiOkResponse({ type: DoctorEntity })
  @Post()
  createDoctor(@Body() body: DoctorDto): Promise<DoctorEntity> {
    return this.doctorsService.createEntity(body);
  }

  @ApiOkResponse({ type: DoctorEntity })
  @Patch('/:id')
  updateDoctorById(
    @Param('id') id: string,
    @Body('desc') desc: string,
  ): Promise<DoctorEntity> {
    return this.doctorsService.updateDoctorById(id, desc);
  }

  @Delete('/:id')
  deleteDoctorById(@Param('id') id: string): Promise<void> {
    return this.doctorsService.deleteEntityById(id);
  }
}
