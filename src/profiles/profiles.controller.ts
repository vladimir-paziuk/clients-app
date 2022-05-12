import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SwaggerApiErrorResponse } from 'common/swagger/swagger-api-error-response';
import { ProfilesService } from './profiles.service';
import { ProfileEntity } from './profile.entity';

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
}
