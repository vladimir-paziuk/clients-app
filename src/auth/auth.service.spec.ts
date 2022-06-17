import { Test } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { CryptStrategy } from '../common/jwt/crypt.strategy';
import { JwtToken } from '../common/jwt/jwt.strategy';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from '../auth/dtos/auth-credentials.dto';
import { RoleEntity } from '../auth/entities/role.entity';
import { UserEntity } from '../auth/entities/user.entity';

import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

import { RolesRepository } from './roles.repository';
import { RolesService } from './roles.service';

import { PatientsRepository } from '../patients/patients.repository';
import { PatientsService } from '../patients/patients.service';

import { ProfilesRepository } from '../profiles/profiles.repository';
import { ProfilesService } from '../profiles/profiles.service';

const mockUsersRepository = () => ({
  findOne: jest.fn(),
  createUser: jest.fn(),
});
const mockRolesRepository = () => ({
  findOne: jest.fn(),
});
const mockPatientsRepository = () => ({
  createPatient: jest.fn(),
});
const mockProfilesRepository = () => ({
  createProfile: jest.fn(),
});
const mockJwtStrategy = () => ({
  sign: jest.fn(),
});
const mockCryptStrategy = () => ({
  hashPassword: jest.fn(),
  comparePasswords: jest.fn(),
});

const mockAccessToken = 'accessToken';
const mockAccessTokenPayload = new JwtToken();
mockAccessTokenPayload.accessToken = mockAccessToken;

const mockAuthCredentials = new AuthCredentialsDto();

const mockRole = new RoleEntity(); // Should be DTO
const mockUser = new UserEntity(); // Should be DTO
mockUser.roles = [mockRole];

describe('AuthService', () => {
  let authService: AuthService;

  let usersRepository;
  let rolesRepository;
  let patientsRepository;
  let profilesRepository;

  let jwtService;
  let cryptStrategy;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        RolesService,
        PatientsService,
        ProfilesService,
        { provide: UsersRepository, useFactory: mockUsersRepository },
        { provide: PatientsRepository, useFactory: mockPatientsRepository },
        { provide: RolesRepository, useFactory: mockRolesRepository },
        { provide: ProfilesRepository, useFactory: mockProfilesRepository },
        { provide: JwtService, useFactory: mockJwtStrategy },
        {
          provide: CryptStrategy,
          useFactory: mockCryptStrategy,
        },
      ],
    }).compile();

    authService = module.get(AuthService);

    usersRepository = module.get(UsersRepository);
    rolesRepository = module.get(RolesRepository);
    patientsRepository = module.get(PatientsRepository);
    profilesRepository = module.get(ProfilesRepository);

    jwtService = module.get(JwtService);
    cryptStrategy = module.get(CryptStrategy);
  });

  describe('signUp', () => {
    it('calls AuthRepository.signUp and returns the result', async () => {
      usersRepository.createUser.mockResolvedValue(mockUser);
      rolesRepository.findOne.mockResolvedValue(mockRole);
      profilesRepository.createProfile.mockResolvedValue(mockUser);
      patientsRepository.createPatient.mockResolvedValue(mockUser);

      cryptStrategy.hashPassword.mockResolvedValue('1123');
      jwtService.sign.mockResolvedValue(mockAccessToken);

      const result = await authService.signUp(mockAuthCredentials);
      expect(result).toEqual(mockAccessTokenPayload);
    });
  });

  describe('signIn', () => {
    it('calls AuthRepository.signIn and returns the result', async () => {
      usersRepository.findOne.mockResolvedValue(mockUser);
      jwtService.sign.mockResolvedValue(mockAccessToken);
      cryptStrategy.comparePasswords.mockResolvedValue(true);

      const result = await authService.signIn(mockAuthCredentials);
      expect(result).toEqual(mockAccessTokenPayload);
    });

    it('calls AuthRepository.signIn and returns not found exception', async () => {
      usersRepository.findOne.mockResolvedValue(null);

      expect(authService.signIn(mockAuthCredentials)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
