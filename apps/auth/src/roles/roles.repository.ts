import { Repository } from 'typeorm';
import { CustomRepository } from '@vp-clients-app/common-pkg';
import { RoleEntity } from 'src/roles/role.entity';

// @EntityRepository is deprecated, see module description
@CustomRepository(RoleEntity)
export class RolesRepository extends Repository<RoleEntity> {}
