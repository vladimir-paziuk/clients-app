import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { SwaggerApiErrorResponse } from 'src/common/swagger/swagger-api-error-response';

import { AUTH_BEARER_DEFAULT } from 'src/common/swagger/swagger.config';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from 'src/common/jwt/get-user.guard';
import { JwtPayload } from 'src/common/jwt/jwt.strategy';

import { AppointmentsService } from 'src/appointments/appointments.service';
import { AppointmentDto } from 'src/appointments/dtos/appointment.dto';
import { AppointmentEntity } from 'src/appointments/appointment.entity';

@ApiBearerAuth(AUTH_BEARER_DEFAULT)
@UseGuards(AuthGuard())
@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @ApiOperation({
    summary: 'Create new appointment instance.',
    description: 'Returns and create appointment data based on AppointmentDto.',
  })
  @ApiOkResponse({
    type: AppointmentEntity,
    description: 'Create appointment',
  })
  @SwaggerApiErrorResponse()
  @Post()
  createAppointment(
    @Body() body: AppointmentDto,
    @GetUser() user: JwtPayload,
  ): Promise<AppointmentEntity> {
    return this.appointmentsService.createAppointment(body, user);
  }

  @ApiOperation({
    summary: 'Get all my appointments. Available only for doctors.',
    description: 'Returns all appointments related my user reference.',
  })
  @ApiOkResponse({
    type: AppointmentEntity,
    isArray: true,
    description: 'Return appointments',
  })
  @SwaggerApiErrorResponse()
  @Get('/me')
  getAppointments(@GetUser() user: JwtPayload): Promise<AppointmentEntity[]> {
    return this.appointmentsService.getAppointments(user);
  }
}
