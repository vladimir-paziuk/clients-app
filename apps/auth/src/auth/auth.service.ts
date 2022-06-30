import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload, JwtToken } from '@vp-clients-app/common-pkg';
import { CryptService } from '@vp-clients-app/common-pkg';

import { UserEntity } from 'src/users/user.entity';
import { AuthCredentialsDto } from 'src/auth/dtos/auth-credentials.dto';

import { ClinicClientService } from 'src/httpClient/clinic.client.service';
import { ProfilesClientService } from 'src/httpClient/profiles.client.service';
import { UsersService } from 'src/users/users.service';

import { RolesService } from 'src/roles/roles.service';
import { ROLES_ENUM } from '@vp-clients-app/common-pkg';
import { ROLES_KEY } from '@vp-clients-app/common-pkg';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    // private profilesService: ProfilesService,
    // private patientsService: PatientsService,
    private jwtService: JwtService,
    private cryptService: CryptService,
    private clinicService: ClinicClientService,
    private profilesService: ProfilesClientService,
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
    const access = await this.getAccess(user);

    this.clinicService.createPatient({ userId: user.id }, access);
    this.profilesService.createProfile({ userId: user.id }, access);

    return access;
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
