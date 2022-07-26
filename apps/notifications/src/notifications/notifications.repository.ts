import { Repository } from 'typeorm';

import { CustomRepository } from '@vp-clients-app/common-pkg';

import { NotificationEntity } from 'src/notifications/notification.entity';
import { NotificationDto } from 'src/notifications/dtos/notification.dto';

// @EntityRepository is deprecated, see module description
@CustomRepository(NotificationEntity)
export class NotificationsRepository extends Repository<NotificationEntity> {
  async createNotification(dto: NotificationDto): Promise<NotificationEntity> {
    const entity = this.create(dto);
    return this.save(entity);
  }
}
