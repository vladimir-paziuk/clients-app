import { Repository } from 'typeorm';
import { CustomRepository } from 'common/database/typeorm-ex.decorator';
import { UserEntity } from './user.entity';
import { AuthCredentialsDto } from './dtos/authCredentialsDto';

// @EntityRepository is deprecated, see module description
@CustomRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async createUser(credentials: AuthCredentialsDto): Promise<UserEntity> {
    const entity = this.create(credentials);
    return await this.save(entity);
  }
}
