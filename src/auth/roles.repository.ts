import { Repository } from 'typeorm';
import { CustomRepository } from 'src/common/database/typeorm-ex.decorator';
import { RoleEntity } from 'src/auth/entities/role.entity';

// @EntityRepository is deprecated, see module description
@CustomRepository(RoleEntity)
export class RolesRepository extends Repository<RoleEntity> {}
