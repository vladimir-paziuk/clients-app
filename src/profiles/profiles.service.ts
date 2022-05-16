import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfilesRepository } from './profiles.repository';
import { ProfileEntity } from './profile.entity';
import { ProfileCreateDto, ProfileDto } from 'profiles/dtos/profile.dto';
import { JwtPayload } from 'common/jwt/jwt.strategy';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfilesRepository)
    private profilesRepository: ProfilesRepository,
  ) {}
  async getProfile(user: JwtPayload): Promise<ProfileEntity> {
    const found = await this.profilesRepository.findOne({
      where: { userId: user.id },
    });

    if (found) {
      return found;
    }
    throw new NotFoundException();
  }

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
    return this.profilesRepository.createProfile(profile);
  }

  async updateProfile(id: string, dto: ProfileDto): Promise<ProfileEntity> {
    const entity = await this.getProfileById(id);
    const updated = { ...entity, ...dto };

    await this.profilesRepository.save(updated);

    return updated;
  }
}
