import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { POSTGRESQL_CODES } from 'src/common/constants/postgresql.codes';

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

  async getUser(credentials: AuthCredentialsDto): Promise<UserEntity> {
    const found = this.usersRepository.findOne({
      where: { email: credentials.email },
    });

    if (found) {
      return found;
    }
    throw new NotFoundException();
  }
}