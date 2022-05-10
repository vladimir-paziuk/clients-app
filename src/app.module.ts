import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { DoctorsModule } from './doctors/doctors.module';
import { UserEntity } from './auth/user.entity';
import { DoctorEntity } from './doctors/doctor.entity';

@Module({
  imports: [
    AuthModule,
    DoctorsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'clients-management',
      autoLoadEntities: true,
      synchronize: true,
      entities: [DoctorEntity, UserEntity],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
