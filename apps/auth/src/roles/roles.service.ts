import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RolesRepository } from 'src/roles/roles.repository';
import { RoleEntity } from 'src/roles/role.entity';

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
