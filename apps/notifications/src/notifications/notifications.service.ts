import { Injectable } from '@nestjs/common';
import { NotificationEntity } from 'src/notifications/notification.entity';
import { NotificationDto } from 'src/notifications/dtos/notification.dto';

@Injectable()
export class NotificationsService {
  // constructor() {}

  async createNotification(dto: NotificationDto): Promise<NotificationEntity> {
    return new NotificationEntity();
  }
}
