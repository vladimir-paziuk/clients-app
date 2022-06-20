import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload, JwtToken } from '../common/jwt/jwt.strategy';
import { CryptService } from 'src/common/jwt/crypt.service';

import { UserEntity } from './entities/user.entity';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';

import { ProfilesService } from '../profiles/profiles.service';
import { PatientsService } from '../patients/patients.service';
import { UsersService } from './users.service';

import { RolesService } from './roles.service';
import { ROLES_ENUM } from './enums/roles.enum';
import { ROLES_KEY } from './roles.guard';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private profilesService: ProfilesService,
    private patientsService: PatientsService,
    private jwtService: JwtService,
    private cryptService: CryptService,
  ) {}

  async getAccess(user: UserEntity): Promise<JwtToken> {
    const payload: JwtPayload = {
      id: user.id,
      roles: user.roles.map(({ name }) => name),
    };
    const accessToken: string = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async signUp(credentials: AuthCredentialsDto): Promise<JwtToken> {
    const { email, password } = credentials;

    const hashedPassword = await this.cryptService.hashPassword(password);

    // Make user with Patient role by default
    const role = await this.rolesService.getRole(ROLES_ENUM.patient);
    const user = await this.usersService.createUser(
      {
        email,
        password: hashedPassword,
      },
      [role],
    );
    await this.profilesService.createProfile({ userId: user.id });
    await this.patientsService.createPatient({ userId: user.id });

    return this.getAccess(user);
  }

  async signIn(credentials: AuthCredentialsDto): Promise<JwtToken> {
    const user = await this.usersService.getUser(credentials, [ROLES_KEY]);

    if (
      user &&
      (await this.cryptService.comparePasswords(
        credentials.password,
        user.password,
      ))
    ) {
      return this.getAccess(user);
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
