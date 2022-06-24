import { Repository } from 'typeorm';

import { CustomRepository } from '@vp-clients-app/common-pkg';
import { UserEntity } from 'src/users/user.entity';
import { AuthCredentialsDto } from 'src/auth/dtos/auth-credentials.dto';
import { RoleEntity } from 'src/roles/role.entity';

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
