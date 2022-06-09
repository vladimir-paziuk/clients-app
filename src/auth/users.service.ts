import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';

import { UserEntity } from 'src/auth/entities/user.entity';
import { RoleEntity } from 'src/auth/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async createUser(
    credentials: AuthCredentialsDto,
    roles: RoleEntity[],
  ): Promise<UserEntity> {
    return this.usersRepository.createUser(credentials, roles);
  }

  async getUser(credentials: AuthCredentialsDto): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: { email: credentials.email },
    });
  }
}
