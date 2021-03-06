import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfilesRepository } from 'src/profiles/profiles.repository';
import { ProfileEntity } from 'src/profiles/profile.entity';
import { ProfileCreateDto, ProfileDto } from 'src/profiles/dtos/profile.dto';
import { JwtPayload } from '@vp-clients-app/common-pkg';

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
