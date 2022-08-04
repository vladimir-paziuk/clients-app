import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Logger, POSTGRESQL_CODES } from '@vp-clients-app/common-pkg';

import { UserEntity } from 'src/users/user.entity';
import { RoleEntity } from 'src/roles/role.entity';

import { UsersRepository } from 'src/users/users.repository';
import { AuthCredentialsDto } from 'src/auth/dtos/auth-credentials.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private logger: Logger,
  ) {}

  async createUser(
    credentials: AuthCredentialsDto,
    roles: RoleEntity[],
  ): Promise<UserEntity> {
    try {
      return await this.usersRepository.createUser(credentials, roles);
    } catch (error) {
      if (error.code === POSTGRESQL_CODES.userExists) {
        await this.logger.error({
          name: 'User name already exist',
          stack: error.stack,
          error,
        });
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
    const found = await this.usersRepository.findOne({
      relations,
      where: { email: credentials.email },
    });

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
}
