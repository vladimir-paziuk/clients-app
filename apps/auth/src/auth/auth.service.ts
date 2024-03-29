import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload, JwtToken, Logger } from '@vp-clients-app/common-pkg';
import { CryptService } from '@vp-clients-app/common-pkg';

import { UserEntity } from 'src/users/user.entity';
import { AuthCredentialsDto } from 'src/auth/dtos/auth-credentials.dto';
import { AuthPublisher } from 'src/auth/auth.publisher';

import { ClinicClientService } from 'src/http-client/clinic.client.service';
import { ProfilesClientService } from 'src/http-client/profiles.client.service';
import { UsersService } from 'src/users/users.service';

import { RolesService } from 'src/roles/roles.service';
import { ROLES_ENUM } from '@vp-clients-app/common-pkg';
import { ROLES_KEY } from '@vp-clients-app/common-pkg';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private jwtService: JwtService,
    private cryptService: CryptService,
    private clinicService: ClinicClientService,
    private profilesService: ProfilesClientService,
    private authPublisher: AuthPublisher,
    private logger: Logger,
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
    const token = await this.getAccess(user);

    this.authPublisher.create({ userId: user.id });

    // this.clinicService.createPatient({ userId: user.id }, token);
    // this.profilesService.createProfile({ userId: user.id }, token);

    return token;
  }

  async signIn(credentials: AuthCredentialsDto): Promise<JwtToken> {
    let user: UserEntity;

    try {
      user = await this.usersService.getUser(credentials, [ROLES_KEY]);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        await this.logger.error({
          name: 'Unauthorized',
          stack: error.stack,
          error,
        });
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
