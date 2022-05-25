import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload, JwtToken } from 'src/common/jwt/jwt.strategy';
import { POSTGRESQL_CODES } from 'src/common/constants/postgresql.codes';
import {
  cryptComparePasswords,
  cryptHashPassword,
} from 'src/common/jwt/crypt.strategy';

import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from 'src/auth/dtos/auth-credentials.dto';

import { ProfilesService } from 'src/profiles/profiles.service';
import { PatientsService } from 'src/patients/patients.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private profilesService: ProfilesService,
    private patientsService: PatientsService,
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
      await this.patientsService.createPatient({ userId: user.id });
      // TODO: Create user_role instance
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
      const payload: JwtPayload = { id: user.id };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
