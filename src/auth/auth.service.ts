import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { JwtPayload, JwtToken } from 'common/strategies/jwt.strategy';
import { POSTGRESQL_CODES } from 'common/constants/postgresql-codes';

import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dtos/authCredentialsDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(credentials: AuthCredentialsDto): Promise<void> {
    const { username, password } = credentials;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await this.usersRepository.createUser({
        username,
        password: hashedPassword,
      });
    } catch (err) {
      if (err.code === POSTGRESQL_CODES.userExists) {
        throw new ConflictException('User name already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(credentials: AuthCredentialsDto): Promise<JwtToken> {
    const { username, password } = credentials;
    const user = await this.usersRepository.findOne({
      where: { username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
