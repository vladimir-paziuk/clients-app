import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RolesRepository } from 'apps/auth/roles.repository';
import { RoleEntity } from 'apps/auth/entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesRepository)
    private rolesRepository: RolesRepository,
  ) {}

  async getRole(name: string): Promise<RoleEntity> {
    return this.rolesRepository.findOne({
      where: { name },
    });
  }
}
