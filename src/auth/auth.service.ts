import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload, JwtToken } from 'src/common/jwt/jwt.strategy';
import {
  cryptComparePasswords,
  cryptHashPassword,
} from 'src/common/jwt/crypt.strategy';

import { UserEntity } from 'src/auth/entities/user.entity';
import { AuthCredentialsDto } from 'src/auth/dtos/auth-credentials.dto';

import { ProfilesService } from 'src/profiles/profiles.service';
import { PatientsService } from 'src/patients/patients.service';
import { UsersService } from 'src/auth/users.service';

import { RolesService } from 'src/auth/roles.service';
import { ROLES_ENUM } from 'src/auth/enums/roles.enum';
import { ROLES_KEY } from 'src/auth/roles.guard';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private profilesService: ProfilesService,
    private patientsService: PatientsService,
    private jwtService: JwtService,
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

    const hashedPassword = await cryptHashPassword(password);

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
      (await cryptComparePasswords(credentials.password, user.password))
    ) {
      return this.getAccess(user);
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
