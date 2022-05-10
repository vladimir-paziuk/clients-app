import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtToken } from 'common/jwt/jwt.strategy';
import { AuthCredentialsDto } from './dtos/authCredentialsDto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() credentials: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(credentials);
  }

  @ApiOkResponse({ type: JwtToken })
  @Post('/sign-in')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<JwtToken> {
    return this.authService.signIn(authCredentialsDto);
  }
}
