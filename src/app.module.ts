import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from 'auth/auth.module';
import { UserEntity } from 'auth/user.entity';

import { DoctorsModule } from 'doctors/doctors.module';
import { DoctorEntity } from 'doctors/doctor.entity';

import { PatientsModule } from 'patients/patients.module';
import { PatientEntity } from 'patients/patient.entity';

import { ProfilesModule } from 'profiles/profiles.module';
import { ProfileEntity } from 'profiles/profile.entity';

@Module({
  imports: [
    AuthModule,
    ProfilesModule,
    PatientsModule,
    DoctorsModule,
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
        synchronize: true,
        entities: [UserEntity, ProfileEntity, DoctorEntity, PatientEntity],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
