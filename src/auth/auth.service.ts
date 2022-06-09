import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload, JwtToken } from 'src/common/jwt/jwt.strategy';
import { POSTGRESQL_CODES } from 'src/common/constants/postgresql.codes';
import {
  cryptComparePasswords,
  cryptHashPassword,
} from 'src/common/jwt/crypt.strategy';

import { AuthCredentialsDto } from 'src/auth/dtos/auth-credentials.dto';

import { ProfilesService } from 'src/profiles/profiles.service';
import { PatientsService } from 'src/patients/patients.service';
import { UsersService } from 'src/auth/users.service';
import { RolesService } from 'src/auth/roles.service';
import { ROLES_ENUM } from 'src/auth/enums/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private profilesService: ProfilesService,
    private patientsService: PatientsService,
    private jwtService: JwtService,
  ) {}

  async signUp(credentials: AuthCredentialsDto): Promise<void> {
    const { email, password } = credentials;

    const hashedPassword = await cryptHashPassword(password);

    try {
      // Make user with Patient role by default
      const role = await this.rolesService.getRole({
        name: ROLES_ENUM.patient,
      });
      const user = await this.usersService.createUser(
        {
          email,
          password: hashedPassword,
        },
        [role],
      );
      await this.profilesService.createProfile({ userId: user.id });
      await this.patientsService.createPatient({ userId: user.id });
    } catch (err) {
      if (err.code === POSTGRESQL_CODES.userExists) {
        throw new ConflictException('User name already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(credentials: AuthCredentialsDto): Promise<JwtToken> {
    const user = await this.usersService.getUser(credentials);

    if (
      user &&
      (await cryptComparePasswords(credentials.password, user.password))
    ) {
      const payload: JwtPayload = { id: user.id };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
