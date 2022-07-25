import { Module } from '@nestjs/common';
import { NotificationsConsumer } from 'src/notifications/notifications.consumer';
import { NotificationsService } from './notifications.service';

@Module({
  controllers: [NotificationsConsumer],
  providers: [NotificationsService],
})
export class NotificationsModule {}
