import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload, JwtToken } from 'common/jwt/jwt.strategy';
import { POSTGRESQL_CODES } from 'common/constants/postgresql.codes';
import {
  cryptComparePasswords,
  cryptHashPassword,
} from 'common/jwt/crypt.strategy';

import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dtos/authCredentialsDto';
import { ProfilesService } from '../profiles/profiles.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private profilesService: ProfilesService,
    private jwtService: JwtService,
  ) {}

  async signUp(credentials: AuthCredentialsDto): Promise<void> {
    const { email, password } = credentials;

    const hashedPassword = await cryptHashPassword(password);

    try {
      const user = await this.usersRepository.createUser({
        email,
        password: hashedPassword,
      });
      await this.profilesService.createProfile({ userId: user.id });
    } catch (err) {
      if (err.code === POSTGRESQL_CODES.userExists) {
        throw new ConflictException('User name already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(credentials: AuthCredentialsDto): Promise<JwtToken> {
    const { email, password } = credentials;
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (user && (await cryptComparePasswords(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
