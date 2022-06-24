import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from 'apps/auth/auth.module';
import { UserEntity } from 'apps/auth/entities/user.entity';
import { RoleEntity } from 'apps/auth/entities/role.entity';

import { DoctorsModule } from 'apps/clinic/doctors/doctors.module';
import { DoctorEntity } from 'apps/clinic/doctors/doctor.entity';

import { PatientsModule } from 'apps/clinic/patients/patients.module';
import { PatientEntity } from 'apps/clinic/patients/patient.entity';

import { ProfilesModule } from 'apps/profiles/profiles.module';
import { ProfileEntity } from 'apps/profiles/profile.entity';

import { AppointmentsModule } from 'apps/clinic/appointments/appointments.module';
import { AppointmentEntity } from 'apps/clinic/appointments/appointment.entity';

import { ResolutionsModule } from 'apps/clinic/resolutions/resolutions.module';
import { ResolutionEntity } from 'apps/clinic/resolutions/resolution.entity';

@Module({
  imports: [
    AuthModule,
    ProfilesModule,
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
          UserEntity,
          RoleEntity,
          ProfileEntity,
          PatientEntity,
          DoctorEntity,
          AppointmentEntity,
          ResolutionEntity,
        ],
        synchronize: false,
        migrationsRun: true,
        logging: true,
        migrationsTableName: 'migration_table',
        migrations: ['dist/migration/*.js'],
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
