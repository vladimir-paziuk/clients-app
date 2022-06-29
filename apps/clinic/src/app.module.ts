import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ResolutionsModule } from 'src/modules/resolutions/resolutions.module';
import { ResolutionEntity } from 'src/modules/resolutions/resolution.entity';

import { DoctorsModule } from 'src/modules/doctors/doctors.module';
import { DoctorEntity } from 'src/modules/doctors/doctor.entity';

import { PatientsModule } from 'src/modules/patients/patients.module';
import { PatientEntity } from 'src/modules/patients/patient.entity';

import { AppointmentsModule } from 'src/modules/appointments/appointments.module';
import { AppointmentEntity } from 'src/modules/appointments/appointment.entity';

@Module({
  imports: [
    PatientsModule,
    DoctorsModule,
    AppointmentsModule,
    ResolutionsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DATABASE_HOST'),
        port: config.get('DATABASE_PORT'),
        username: config.get('DATABASE_USERNAME'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_NAME'),
        autoLoadEntities: true,
        entities: [
          PatientEntity,
          DoctorEntity,
          AppointmentEntity,
          ResolutionEntity,
        ],
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
