import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Method } from 'axios';

import { JwtToken } from '@vp-clients-app/common-pkg';

import {
  getPrefixedToken,
  profilesClientAPI,
} from 'src/http-client/api.client.enum';

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
    const host = this.configService.get('PROFILES_SERVICE_HOST');
    const port = this.configService.get('PROFILES_SERVICE_PORT');
    const url = `${host}:${port}/${path}`;
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
