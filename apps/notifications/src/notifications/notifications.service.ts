import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import {
  AppointmentAbstract,
  ResolutionAbstract,
} from '@vp-clients-app/common-pkg';

import { NotificationEntity } from 'src/notifications/notification.entity';
import { NotificationDto } from 'src/notifications/dtos/notification.dto';
import { NotificationsRepository } from 'src/notifications/notifications.repository';
import { NotificationsEnum } from 'src/constants/notifications.enum';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationsRepository)
    private notificationsRepository: NotificationsRepository,
  ) {}

  async createAppointmentNotification(
    dto: NotificationDto<AppointmentAbstract>,
  ): Promise<NotificationEntity> {
    return await this.notificationsRepository.createNotification({
      ...dto,
      type: NotificationsEnum.appointment,
    });
  }

  async createResolutionNotification(
    dto: NotificationDto<ResolutionAbstract>,
  ): Promise<NotificationEntity> {
    return await this.notificationsRepository.createNotification({
      ...dto,
      type: NotificationsEnum.resolution,
    });
  }
}
