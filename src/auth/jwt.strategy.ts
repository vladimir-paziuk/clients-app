import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersRepository } from './users.repository';
import { AUTH_SECRET_KEY } from './auth.module';
import { UserEntity } from './user.entity';

export interface JwtPayload {
  username: string;
}
export interface JwtToken {
  accessToken: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      secretOrKey: AUTH_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { username } = payload;
    return await this.usersRepository.findOne({
      where: { username },
    });
  }
}
