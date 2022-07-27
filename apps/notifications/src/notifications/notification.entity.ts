import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@vp-clients-app/common-pkg';
import { NotificationsEnum } from 'src/constants/notifications.enum';

@Entity('notifications', { schema: 'notifications' })
export class NotificationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: NotificationsEnum })
  type: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'is_read' })
  isRead: boolean;

  @Column()
  payload: string;
}
