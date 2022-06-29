import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtToken } from '@vp-clients-app/common-pkg';
import { AuthCredentialsDto } from 'src/auth/dtos/auth-credentials.dto';
import {
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SwaggerApiErrorResponse } from '@vp-clients-app/common-pkg';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Create user and sign in',
    description: 'Returns and create user data based on AuthCredentialsDto.',
  })
  @ApiOkResponse({ description: 'User created' })
  @ApiConflictResponse({
    description: 'User name already exist',
  })
  @SwaggerApiErrorResponse()
  @Post('/sign-up')
  signUp(@Body() credentials: AuthCredentialsDto): Promise<JwtToken> {
    return this.authService.signUp(credentials);
  }

  @ApiOperation({
    summary: 'Sign in',
    description: 'Return access token based on AuthCredentialsDto credentials.',
  })
  @ApiOkResponse({ type: JwtToken, description: 'User logged in' })
  @SwaggerApiErrorResponse()
  @Post('/sign-in')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<JwtToken> {
    return this.authService.signIn(authCredentialsDto);
  }
}
