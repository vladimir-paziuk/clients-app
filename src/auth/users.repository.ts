import { Repository } from 'typeorm';

import { CustomRepository } from '../common/database/typeorm-ex.decorator';
import { UserEntity } from '../auth/entities/user.entity';
import { AuthCredentialsDto } from '../auth/dtos/auth-credentials.dto';
import { RoleEntity } from '../auth/entities/role.entity';

// @EntityRepository is deprecated, see module description
@CustomRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async createUser(
    credentials: AuthCredentialsDto,
    roles: RoleEntity[],
  ): Promise<UserEntity> {
    const { email, password } = credentials;
    const entity = this.create({ email, password, roles });
    return this.save(entity);
  }
}
