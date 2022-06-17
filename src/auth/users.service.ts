import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { POSTGRESQL_CODES } from '../common/constants/postgresql.codes';

import { UserEntity } from '../auth/entities/user.entity';
import { RoleEntity } from '../auth/entities/role.entity';

import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';

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
    try {
      return await this.usersRepository.createUser(credentials, roles);
    } catch (err) {
      if (err.code === POSTGRESQL_CODES.userExists) {
        throw new ConflictException('User name already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUser(
    credentials: AuthCredentialsDto,
    relations: string[] = [],
  ): Promise<UserEntity> {
    const found = this.usersRepository.findOne({
      relations,
      where: { email: credentials.email },
    });

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
}
