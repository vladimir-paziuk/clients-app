import { Controller } from '@nestjs/common';
import {
  KafkaContext,
  MessagePattern,
  Ctx,
  Payload,
} from '@nestjs/microservices';

import { PatientEntity } from 'src/modules/patients/patient.entity';
import { PatientsService } from 'src/modules/patients/patients.service';
import { PatientCreateDto } from 'src/modules/patients/dtos/patient.dto';

@Controller('patients')
export class PatientsMessagesController {
  constructor(private patientsService: PatientsService) {}

  @MessagePattern('auth.user.created')
  async createPatient(
    @Payload() payload: any,
    @Ctx() context: KafkaContext,
  ): Promise<PatientEntity> {
    // const msg = context.getMessage();
    return await this.patientsService.createPatient(
      payload.value as PatientCreateDto,
    );
  }
}
