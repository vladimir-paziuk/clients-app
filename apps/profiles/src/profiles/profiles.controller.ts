import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { SwaggerApiErrorResponse } from '@vp-clients-app/common-pkg';
import { AUTH_BEARER_DEFAULT } from '@vp-clients-app/common-pkg';
import { GetUser } from '@vp-clients-app/common-pkg';
import { JwtPayload } from '@vp-clients-app/common-pkg';

import { ProfilesService } from 'src/profiles/profiles.service';
import { ProfileEntity } from 'src/profiles/profile.entity';
import { ProfileDto } from 'src/profiles/dtos/profile.dto';

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
    description: 'Update profile instance based on id and ProfileDto.',
  })
  @SwaggerApiErrorResponse()
  @Patch('/:id')
  updateProfile(
    @Param('id') id: string,
    @Body() body: ProfileDto,
  ): Promise<void> {
    return this.profilesService.updateProfile(id, body);
  }
}
