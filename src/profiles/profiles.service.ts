import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfilesRepository } from './profiles.repository';
import { ProfileEntity } from './profile.entity';
import { ProfileCreateDto } from './dtos/profileDto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfilesRepository)
    private profilesRepository: ProfilesRepository,
  ) {}
  async getProfileById(id: string): Promise<ProfileEntity> {
    const found = await this.profilesRepository.findOne({
      where: { id },
    });

    if (found) {
      return found;
    }
    throw new NotFoundException();
  }

  async createProfile(profile: ProfileCreateDto): Promise<ProfileEntity> {
    const entity = await this.profilesRepository.createProfile(profile);

    if (entity) {
      return entity;
    }
    throw new NotFoundException();
  }
}
