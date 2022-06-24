import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { ResolutionsModule } from 'src/resolutions/resolutions.module';
import { ResolutionEntity } from 'src/resolutions/resolution.entity';

import { DoctorsModule } from 'src/doctors/doctors.module';
import { DoctorEntity } from 'src/doctors/doctor.entity';

import { PatientsModule } from 'src/patients/patients.module';
import { PatientEntity } from 'src/patients/patient.entity';

import { AppointmentsModule } from 'src/appointments/appointments.module';
import { AppointmentEntity } from 'src/appointments/appointment.entity';

@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.registerAsync({
    //   useFactory: (config: ConfigService) => ({
    //     secret: config.get('AUTH_SECRET_KEY'),
    //     signOptions: {
    //       expiresIn: +config.get('AUTH_TOKEN_EXPIRE_TIME'),
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
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
