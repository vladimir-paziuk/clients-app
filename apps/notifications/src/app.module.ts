import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { getValidationSchema } from './env.validation.schema';

import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
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
        entities: [],
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
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
