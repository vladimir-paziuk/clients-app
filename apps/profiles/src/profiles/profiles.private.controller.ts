import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AUTH_BEARER_DEFAULT } from '@vp-clients-app/common-pkg';

import { ProfilesService } from 'src/profiles/profiles.service';
import { ProfileEntity } from 'src/profiles/profile.entity';
import { ProfileCreateDto } from 'src/profiles/dtos/profile.dto';

@ApiBearerAuth(AUTH_BEARER_DEFAULT)
@ApiTags('Profiles')
@Controller('profiles')
@UseGuards(AuthGuard())
export class ProfilesPrivateController {
  constructor(private profilesService: ProfilesService) {}

  @Post()
  createProfile(@Body() profile: ProfileCreateDto): Promise<ProfileEntity> {
    return this.profilesService.createProfile(profile);
  }
}
