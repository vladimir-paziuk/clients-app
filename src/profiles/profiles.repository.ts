import { Repository } from 'typeorm';
import { CustomRepository } from 'src/common/database/typeorm-ex.decorator';
import { ProfileEntity } from './profile.entity';
import { ProfileCreateDto } from 'src/profiles/dtos/profile.dto';

// @EntityRepository is deprecated, see module description
@CustomRepository(ProfileEntity)
export class ProfilesRepository extends Repository<ProfileEntity> {
  async createProfile(profile: ProfileCreateDto): Promise<ProfileEntity> {
    const entity = this.create(profile);
    return this.save(entity);
  }

  // async getProfileByUser(user: UserEntity): Promise<ProfileEntity> {
  //   return this.createQueryBuilder('profile').where({ user }).getOne();
  // }
}
