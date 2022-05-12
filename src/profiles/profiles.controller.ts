import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SwaggerApiErrorResponse } from 'common/swagger/swagger-api-error-response';
import { ProfilesService } from './profiles.service';
import { ProfileEntity } from './profile.entity';
import { ProfileDto } from './dtos/profileDto';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}
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
