import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { CustomRepository } from '../database/typeorm-ex.decorator';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
}

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
  async createUser(credentials: AuthCredentialsDto): Promise<void> {
    const entity = this.create(credentials);

    try {
      await this.save(entity);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('User name already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
