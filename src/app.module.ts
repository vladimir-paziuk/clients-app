import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserEntity } from 'src/auth/entities/user.entity';
import { RoleEntity } from 'src/auth/entities/role.entity';

import { DoctorsModule } from './doctors/doctors.module';
import { DoctorEntity } from './doctors/doctor.entity';

import { PatientsModule } from './patients/patients.module';
import { PatientEntity } from './patients/patient.entity';

import { ProfilesModule } from './profiles/profiles.module';
import { ProfileEntity } from './profiles/profile.entity';

import { AppointmentsModule } from './appointments/appointments.module';
import { AppointmentEntity } from 'src/appointments/appointment.entity';

import { ResolutionsModule } from './resolutions/resolutions.module';
import { ResolutionEntity } from './resolutions/resolution.entity';

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
