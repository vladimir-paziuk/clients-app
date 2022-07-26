import { Controller } from '@nestjs/common';

import { EventsEnum, IKafkaMessage } from '@vp-clients-app/common-pkg';
import {
  MessagePattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';

import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationDto } from 'src/notifications/dtos/notification.dto';
import { NotificationEntity } from 'src/notifications/notification.entity';

@Controller('notifications')
export class NotificationsConsumer {
  constructor(private notificationsService: NotificationsService) {}

  @MessagePattern(EventsEnum.clinicAppointmentCreated)
  @MessagePattern(EventsEnum.clinicNotificationCreated)
  async createNotification(
    @Payload() payload: IKafkaMessage<NotificationDto>,
    @Ctx() context: KafkaContext,
  ): Promise<NotificationEntity> {
    return await this.notificationsService.createNotification(payload.value);
  }
}
