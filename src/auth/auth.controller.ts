import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './users.repository';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() credentials: AuthCredentialsDto) {
    return this.authService.signUp(credentials);
  }
}
