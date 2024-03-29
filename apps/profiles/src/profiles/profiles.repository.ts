import { Repository } from 'typeorm';

import { CustomRepository } from '@vp-clients-app/common-pkg';

import { ProfileEntity } from 'src/profiles/profile.entity';
import { ProfileCreateDto } from 'src/profiles/dtos/profile.dto';

// @EntityRepository is deprecated, see module description
@CustomRepository(ProfileEntity)
export class ProfilesRepository extends Repository<ProfileEntity> {
  async createProfile(profile: ProfileCreateDto): Promise<ProfileEntity> {
    const entity = this.create(profile);
    return this.save(entity);
  }
}
