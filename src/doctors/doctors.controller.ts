import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorDto } from './doctor.model';

@Controller('doctors')
export class DoctorsController {
  constructor(private doctorsService: DoctorsService) {}

  @Get()
  getDoctors() {
    return this.doctorsService.getData();
  }

  @Post()
  createDoctor(@Body() body: DoctorDto) {
    return this.doctorsService.createEntity(body);
  }

  @Get('/:id')
  getDoctorById(@Param('id') id: string) {
    return this.doctorsService.getEntityById(id);
  }

  @Patch('/:id')
  updateDoctorById(@Param('id') id: string, @Body('desc') desc: string) {
    return this.doctorsService.updateDoctorById(id, desc);
  }

  @Delete('/:id')
  deleteDoctorById(@Param('id') id: string) {
    return this.doctorsService.deleteEntityById(id);
  }
}
