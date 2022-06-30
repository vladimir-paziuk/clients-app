import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Method } from 'axios';

import { JwtToken } from '@vp-clients-app/common-pkg';

const profilesClientAPI = {
  createProfile: 'profiles',
};
const baseUrl = `http://localhost`;
const getPrefixedToken = (token: string) => `Bearer ${token}`;

@Injectable()
export class ProfilesClientService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private createRequest(
    method: Method,
    path: string,
    data: any,
    token: JwtToken,
  ): any {
    const port = this.configService.get('PROFILES_APP_PORT');
    const url = `${baseUrl}:${port}/${path}`;
    return this.httpService.request({
      method,
      url,
      data,
      headers: {
        Authorization: getPrefixedToken(token.accessToken),
      },
    });
  }

  createProfile(data: { userId: string }, token: JwtToken): any {
    return this.createRequest(
      'POST',
      profilesClientAPI.createProfile,
      data,
      token,
    ).subscribe();
  }
}
