import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ApiProperty } from '@nestjs/swagger';

// TODO: Move to config
import { AUTH_SECRET_KEY } from 'auth/auth.module';

export class JwtPayload {
  username: string;
}
export class JwtToken {
  @ApiProperty()
  accessToken: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: AUTH_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
