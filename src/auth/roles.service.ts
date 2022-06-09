import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RolesRepository } from 'src/auth/roles.repository';
import { RoleEntity } from 'src/auth/entities/role.entity';

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
