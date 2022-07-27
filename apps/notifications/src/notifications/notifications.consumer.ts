import { Controller } from '@nestjs/common';

import { EventsEnum, IKafkaMessage } from '@vp-clients-app/common-pkg';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationDto } from 'src/notifications/dtos/notification.dto';
import { NotificationEntity } from 'src/notifications/notification.entity';

@Controller('notifications')
export class NotificationsConsumer {
  constructor(private notificationsService: NotificationsService) {}

  @MessagePattern(EventsEnum.clinicAppointmentCreated)
  async createAppointmentNotification(
    @Payload() payload: IKafkaMessage<NotificationDto>,
  ): Promise<NotificationEntity> {
    return await this.notificationsService.createAppointmentNotification(
      payload.value,
    );
  }

  @MessagePattern(EventsEnum.clinicResolutionCreated)
  async createResolutionNotification(
    @Payload() payload: IKafkaMessage<NotificationDto>,
  ): Promise<NotificationEntity> {
    return await this.notificationsService.createResolutionNotification(
      payload.value,
    );
  }
}
