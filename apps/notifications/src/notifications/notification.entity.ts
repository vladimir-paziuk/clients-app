import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { BaseEntity, NotificationsEnum } from '@vp-clients-app/common-pkg';

@Entity('notifications', { schema: 'notifications' })
export class NotificationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: NotificationsEnum })
  type: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'is_read' })
  isRead: string;

  @Column()
  payload: string;
}
