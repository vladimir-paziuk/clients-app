import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'common/database/typeorm-ex.module';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { DoctorsRepository } from './doctors.repository';
import { AuthModule } from 'auth/auth.module';

// TypeOrmExModule.forCustomRepository uses instead TypeOrmExModule.forFeature for
// resolve @EntityRepository deprecated issue, instead use @CustomRepository
// Implement solution from https://gist.github.com/anchan828/9e569f076e7bc18daf21c652f7c3d012
// Also install @nestjs/typeorm@next

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([DoctorsRepository]),
    AuthModule,
  ],
  providers: [DoctorsService],
  controllers: [DoctorsController],
})
export class DoctorsModule {}
