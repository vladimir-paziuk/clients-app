import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { BaseEntity } from '@vp-clients-app/common-pkg';

@Entity('notifications', { schema: 'notifications' })
export class NotificationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  data: string;
}
