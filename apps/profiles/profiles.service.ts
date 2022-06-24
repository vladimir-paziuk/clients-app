import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfilesRepository } from 'apps/profiles/profiles.repository';
import { ProfileEntity } from 'apps/profiles/profile.entity';
import { ProfileCreateDto, ProfileDto } from 'apps/profiles/dtos/profile.dto';
import { JwtPayload } from 'apps/common/jwt/jwt.strategy';

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

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async getProfileById(id: string): Promise<ProfileEntity> {
    const found = await this.profilesRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async createProfile(profile: ProfileCreateDto): Promise<ProfileEntity> {
    return this.profilesRepository.createProfile(profile);
  }

  async updateProfile(id: string, dto: ProfileDto): Promise<void> {
    try {
      await this.profilesRepository.update({ id }, dto);
    } catch (ee) {
      throw new NotFoundException();
    }
  }
}
