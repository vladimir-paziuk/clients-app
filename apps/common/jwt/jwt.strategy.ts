import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ApiProperty } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

export class JwtPayload {
  id: string;
  roles: string[];
}
export class JwtToken {
  @ApiProperty()
  accessToken: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      secretOrKey: config.get('AUTH_SECRET_KEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
