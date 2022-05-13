import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SwaggerApiErrorResponse } from 'common/swagger/swagger-api-error-response';
import { ProfilesService } from './profiles.service';
import { ProfileEntity } from './profile.entity';
import { ProfileDto } from 'profiles/dtos/profile.dto';
import { AUTH_BEARER_DEFAULT } from 'common/swagger/swagger.config';
import { GetUser } from 'common/jwt/get-user.guard';
import { JwtPayload } from 'common/jwt/jwt.strategy';

@ApiBearerAuth(AUTH_BEARER_DEFAULT)
@ApiTags('Profiles')
@Controller('profiles')
@UseGuards(AuthGuard())
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}
  @ApiOperation({
    summary: 'Get my profile.',
    description: 'Returns profile data based on logged user credentials.',
  })
  @ApiOkResponse({
    type: ProfileEntity,
  })
  @SwaggerApiErrorResponse()
  @Get('/me')
  getProfile(@GetUser() user: JwtPayload): Promise<ProfileEntity> {
    return this.profilesService.getProfile(user);
  }

  @ApiOperation({
    summary: 'Get selected profile.',
    description: 'Returns profile data based on id.',
  })
  @ApiOkResponse({
    type: ProfileEntity,
  })
  @SwaggerApiErrorResponse()
  @Get('/:id')
  getProfileById(@Param('id') id: string): Promise<ProfileEntity> {
    return this.profilesService.getProfileById(id);
  }

  @ApiOperation({
    summary: 'Update selected profile.',
    description:
      'Returns and update profile instance based on id and ProfileDto.',
  })
  @ApiOkResponse({
    type: ProfileEntity,
  })
  @SwaggerApiErrorResponse()
  @Patch('/:id')
  updateProfile(
    @Param('id') id: string,
    @Body() body: ProfileDto,
  ): Promise<ProfileEntity> {
    return this.profilesService.updateProfile(id, body);
  }
}
