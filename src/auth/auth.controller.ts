import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtToken } from 'common/jwt/jwt.strategy';
import { AuthCredentialsDto } from './dtos/authCredentialsDto';
import { ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from 'common/swagger/swagger.config';

@ApiTags(SWAGGER_TAGS.auth)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() credentials: AuthCredentialsDto) {
    return this.authService.signUp(credentials);
  }

  @Post('/sign-in')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<JwtToken> {
    return this.authService.signIn(authCredentialsDto);
  }
}
