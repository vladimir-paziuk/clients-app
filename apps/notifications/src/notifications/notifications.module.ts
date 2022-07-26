import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@vp-clients-app/common-pkg';

import { NotificationsSharedModule } from 'src/shared/notifications.shared.module';
import { NotificationsConsumer } from 'src/notifications/notifications.consumer';
import { NotificationsService } from './notifications.service';
import { NotificationsRepository } from 'src/notifications/notifications.repository';

// TypeOrmExModule.forCustomRepository uses instead TypeOrmExModule.forFeature for
// resolve @EntityRepository deprecated issue, instead use @CustomRepository
// Implement solution from https://gist.github.com/anchan828/9e569f076e7bc18daf21c652f7c3d012
// Also install @nestjs/typeorm@next

@Module({
  imports: [
    NotificationsSharedModule,
    TypeOrmExModule.forCustomRepository([NotificationsRepository]),
  ],
  controllers: [NotificationsConsumer],
  providers: [NotificationsService],
})
export class NotificationsModule {}
