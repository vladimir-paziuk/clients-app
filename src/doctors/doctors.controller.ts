import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorDto, DoctorEntity } from './doctors.repository';

@Controller('doctors')
export class DoctorsController {
  constructor(private doctorsService: DoctorsService) {}

  @Get()
  getDoctors(@Query('search') search: string) {
    return this.doctorsService.getData(search);
  }

  @Get('/:id')
  getDoctorById(@Param('id') id: string): Promise<DoctorEntity> {
    return this.doctorsService.getEntityById(id);
  }

  @Post()
  createDoctor(@Body() body: DoctorDto): Promise<DoctorEntity> {
    return this.doctorsService.createEntity(body);
  }

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
