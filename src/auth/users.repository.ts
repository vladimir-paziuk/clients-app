import { Repository } from 'typeorm';
import { CustomRepository } from '../database/typeorm-ex.decorator';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { UserEntity } from './user.entity';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password not correct',
  })
  password: string;
}

// @EntityRepository is deprecated, see module description
@CustomRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async createUser(credentials: AuthCredentialsDto): Promise<UserEntity> {
    const entity = this.create(credentials);
    return await this.save(entity);
  }
}
