import { Repository } from 'typeorm';
import { CustomRepository } from 'common/database/typeorm-ex.decorator';
import { ProfileEntity } from './profile.entity';
import { ProfileCreateDto } from 'profiles/dtos/profile.dto';

// @EntityRepository is deprecated, see module description
@CustomRepository(ProfileEntity)
export class ProfilesRepository extends Repository<ProfileEntity> {
  async createProfile(profile: ProfileCreateDto): Promise<ProfileEntity> {
    const entity = this.create(profile);
    return await this.save(entity);
  }
}
