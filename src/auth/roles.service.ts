import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RolesRepository } from 'src/auth/roles.repository';
import { RoleEntity } from 'src/auth/entities/role.entity';
import { RoleDto } from 'src/auth/dtos/role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesRepository)
    private rolesRepository: RolesRepository,
  ) {}

  async getRole(roleDto: RoleDto): Promise<RoleEntity> {
    return this.rolesRepository.findOne({
      where: roleDto,
    });
  }
}
