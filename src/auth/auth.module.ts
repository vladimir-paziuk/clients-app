import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmExModule } from 'common/database/typeorm-ex.module';
import { UsersRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'common/jwt/jwt.strategy';

export const AUTH_SECRET_KEY = 'topSecret51';
const AUTH_TOKEN_EXPIRE_TIME = 3600;

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: AUTH_SECRET_KEY,
      signOptions: {
        expiresIn: AUTH_TOKEN_EXPIRE_TIME,
      },
    }),
    TypeOrmExModule.forCustomRepository([UsersRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
