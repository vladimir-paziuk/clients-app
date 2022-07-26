import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { getValidationSchema } from './env.validation.schema';

import { NotificationsModule } from './notifications/notifications.module';
import { NotificationEntity } from './notifications/notification.entity';

@Module({
  imports: [
    NotificationsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: getValidationSchema(),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DATABASE_HOST'),
        port: config.get('DATABASE_PORT'),
        username: config.get('DATABASE_USERNAME'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_NAME'),
        autoLoadEntities: true,
        entities: [NotificationEntity],
        synchronize: false,
        migrationsRun: true,
        logging: true,
        migrationsTableName: 'migration_table',
        migrations: [__dirname + './../migrations/*.{js,ts}'],
        cli: {
          migrationsDir: 'migration',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
