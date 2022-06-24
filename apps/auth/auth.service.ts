import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload, JwtToken } from '@vp-clients-app/common-pkg';
import { CryptService } from '@vp-clients-app/common-pkg';

import { UserEntity } from 'apps/auth/entities/user.entity';
import { AuthCredentialsDto } from 'apps/auth/dtos/auth-credentials.dto';

import { ProfilesService } from 'apps/profiles/profiles.service';
import { PatientsService } from 'apps/clinic/patients/patients.service';
import { UsersService } from 'apps/auth/users.service';

import { RolesService } from 'apps/auth/roles.service';
import { ROLES_ENUM } from 'apps/auth/enums/roles.enum';
import { ROLES_KEY } from 'apps/auth/roles.guard';

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
    let user: UserEntity;

    try {
      user = await this.usersService.getUser(credentials, [ROLES_KEY]);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new UnauthorizedException('Unauthorized');
      }
    }

    if (
      user &&
      (await this.cryptService.comparePasswords(
        credentials.password,
        user.password,
      ))
    ) {
      return this.getAccess(user);
    }
  }
}
