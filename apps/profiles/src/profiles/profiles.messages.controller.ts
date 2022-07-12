import { Controller } from '@nestjs/common';
import {
  KafkaContext,
  MessagePattern,
  Ctx,
  Payload,
} from '@nestjs/microservices';

import { ProfilesService } from 'src/profiles/profiles.service';
import { ProfileEntity } from 'src/profiles/profile.entity';
import { ProfileCreateDto } from 'src/profiles/dtos/profile.dto';

@Controller('profiles')
export class ProfilesMessagesController {
  constructor(private profilesService: ProfilesService) {}

  @MessagePattern('auth.user.created')
  async createProfile(
    @Payload() payload: any,
    @Ctx() context: KafkaContext,
  ): Promise<ProfileEntity> {
    // const msg = context.getMessage();
    return await this.profilesService.createProfile(
      payload.value as ProfileCreateDto,
    );
  }
}
