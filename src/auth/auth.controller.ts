import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './users.repository';
import { AuthService } from './auth.service';
import { JwtToken } from './jwt.strategy';

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
