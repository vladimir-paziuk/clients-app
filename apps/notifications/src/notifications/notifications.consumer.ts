import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import {
  AppointmentAbstract,
  EventsEnum,
  IKafkaMessage,
  ResolutionAbstract,
} from '@vp-clients-app/common-pkg';

import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationDto } from 'src/notifications/dtos/notification.dto';
import { NotificationEntity } from 'src/notifications/notification.entity';

@Controller('notifications')
export class NotificationsConsumer {
  constructor(private notificationsService: NotificationsService) {}

  @MessagePattern(EventsEnum.clinicAppointmentCreated)
  async createAppointmentNotification(
    @Payload() payload: IKafkaMessage<NotificationDto<AppointmentAbstract>>,
  ): Promise<NotificationEntity> {
    return await this.notificationsService.createAppointmentNotification(
      payload.value,
    );
  }

  @MessagePattern(EventsEnum.clinicResolutionCreated)
  async createResolutionNotification(
    @Payload() payload: IKafkaMessage<NotificationDto<ResolutionAbstract>>,
  ): Promise<NotificationEntity> {
    return await this.notificationsService.createResolutionNotification(
      payload.value,
    );
  }
}
