import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { NotificationEntity } from 'src/notifications/notification.entity';
import { NotificationDto } from 'src/notifications/dtos/notification.dto';
import { NotificationsRepository } from 'src/notifications/notifications.repository';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationsRepository)
    private notificationsRepository: NotificationsRepository,
  ) {}

  async createNotification(dto: NotificationDto): Promise<NotificationEntity> {
    return await this.notificationsRepository.createNotification(dto);
  }
}
