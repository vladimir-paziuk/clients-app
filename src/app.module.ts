import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from './doctors/doctors.module';
import { DoctorEntity } from './doctors/doctors.repository';

@Module({
  imports: [
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
      entities: [DoctorEntity],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
