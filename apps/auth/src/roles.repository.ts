import { Repository } from 'typeorm';
import { CustomRepository } from '@vp-clients-app/common-pkg';
import { RoleEntity } from 'apps/auth/src/entities/role.entity';

// @EntityRepository is deprecated, see module description
@CustomRepository(RoleEntity)
export class RolesRepository extends Repository<RoleEntity> {}
