import { Test } from '@nestjs/testing';
import { HttpStatus, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { CryptService } from 'apps/common/jwt/crypt.service';
import { JwtToken } from 'apps/common/jwt/jwt.strategy';

import { AuthService } from 'apps/auth/auth.service';
import { AuthCredentialsDto } from 'apps/auth/dtos/auth-credentials.dto';
import { RoleEntity } from 'apps/auth/entities/role.entity';
import { UserEntity } from 'apps/auth/entities/user.entity';
import { ROLES_KEY } from 'apps/auth/roles.guard';

import { UsersService } from 'apps/auth/users.service';
import { RolesService } from 'apps/auth/roles.service';
import { PatientsService } from 'apps/clinic/patients/patients.service';
import { ProfilesService } from 'apps/profiles/profiles.service';

const mockRolesService = () => ({
  getRole: jest.fn(),
});
const mockUsersService = () => ({
  getUser: jest.fn(),
  createUser: jest.fn(),
});
const mockPatientsService = () => ({
  createPatient: jest.fn(),
});
const mockProfilesService = () => ({
  createProfile: jest.fn(),
});
const mockJwtService = () => ({
  sign: jest.fn(),
});
const mockCryptService = () => ({
  hashPassword: jest.fn(),
  comparePasswords: jest.fn(),
});

const mockAccessToken = 'accessToken';
const mockAccessTokenHashed = 'accessTokenHashed';
const mockAccessTokenPayload = new JwtToken();
mockAccessTokenPayload.accessToken = mockAccessToken;

const mockAuthCredentials: AuthCredentialsDto = {
  email: 'user@email.com',
  password: 'Passw0rd',
};
const mockRole: RoleEntity = {
  id: 'uuid2',
  name: 'Patient',
};

const mockUser = new UserEntity();
mockUser.id = 'uuid';
mockUser.email = mockAuthCredentials.email;
mockUser.password = mockAuthCredentials.password;
mockUser.roles = [mockRole];

describe('AuthService', () => {
  let authService: AuthService;

  let rolesService;
  let usersService;
  let patientsService;
  let profilesService;

  let jwtService;
  let cryptService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: RolesService, useFactory: mockRolesService },
        { provide: UsersService, useFactory: mockUsersService },
        { provide: PatientsService, useFactory: mockPatientsService },
        { provide: ProfilesService, useFactory: mockProfilesService },
        { provide: JwtService, useFactory: mockJwtService },
        {
          provide: CryptService,
          useFactory: mockCryptService,
        },
      ],
    }).compile();

    authService = module.get(AuthService);

    rolesService = module.get(RolesService);
    usersService = module.get(UsersService);
    patientsService = module.get(PatientsService);
    profilesService = module.get(ProfilesService);

    jwtService = module.get(JwtService);
    cryptService = module.get(CryptService);
  });

  describe('getAccess', () => {
    it('calls AuthRepository.getAccess and returns the result', async () => {
      expect.assertions(1);

      jwtService.sign.mockResolvedValue(mockAccessToken);

      const result = await authService.getAccess(mockUser);
      expect(result).toEqual(mockAccessTokenPayload);
    });
  });

  describe('signUp', () => {
    it('calls AuthRepository.signUp and returns the result', async () => {
      expect.assertions(4);

      rolesService.getRole.mockResolvedValue(mockRole);
      usersService.createUser.mockResolvedValue(mockUser);
      cryptService.hashPassword.mockResolvedValue(mockAccessTokenHashed);
      authService.getAccess = jest.fn();

      await authService.signUp(mockAuthCredentials);

      expect(authService.getAccess).toBeCalledWith(mockUser);
      expect(usersService.createUser).toBeCalledWith(
        {
          ...mockAuthCredentials,
          password: mockAccessTokenHashed,
        },
        [mockRole],
      );
      expect(profilesService.createProfile).toBeCalledWith({
        userId: mockUser.id,
      });
      expect(patientsService.createPatient).toBeCalledWith({
        userId: mockUser.id,
      });
    });
  });

  describe('signIn', () => {
    it('calls AuthRepository.signIn and returns the result', async () => {
      expect.assertions(1);

      usersService.getUser.mockResolvedValue(mockUser);
      cryptService.comparePasswords.mockResolvedValue(true);

      await authService.signIn(mockAuthCredentials);

      expect(usersService.getUser).toBeCalledWith(mockAuthCredentials, [
        ROLES_KEY,
      ]);
    });

    it('calls AuthRepository.signIn and returns not unauthorized exception', async () => {
      expect.assertions(1);

      usersService.getUser.mockRejectedValue({ status: HttpStatus.NOT_FOUND });

      await expect(authService.signIn(mockAuthCredentials)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
