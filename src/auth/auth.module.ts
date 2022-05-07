import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmExModule } from '../database/typeorm-ex.module';
import { UsersRepository } from './users.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UsersRepository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
