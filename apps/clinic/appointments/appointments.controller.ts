import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { SwaggerApiErrorResponse } from '@vp-clients-app/common-pkg';

import { AUTH_BEARER_DEFAULT } from '@vp-clients-app/common-pkg';
import { AuthGuard } from '@nestjs/passport';

import { JwtPayload } from '@vp-clients-app/common-pkg';
import { GetUser } from '@vp-clients-app/common-pkg';

import { ROLES_ENUM } from 'apps/auth/enums/roles.enum';
import { RolesGuard } from 'apps/auth/roles.guard';

import { AppointmentsService } from 'apps/clinic/appointments/appointments.service';
import { AppointmentDto } from 'apps/clinic/appointments/dtos/appointment.dto';
import { AppointmentEntity } from 'apps/clinic/appointments/appointment.entity';

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
  @RolesGuard(ROLES_ENUM.doctor)
  @Get('/me')
  getAppointments(@GetUser() user: JwtPayload): Promise<AppointmentEntity[]> {
    return this.appointmentsService.getAppointments(user);
  }
}
