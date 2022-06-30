import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Method } from 'axios';

import { JwtToken } from '@vp-clients-app/common-pkg';

import {
  clinicClientAPI,
  getPrefixedToken,
} from 'src/httpClient/api.client.enum';

@Injectable()
export class ClinicClientService {
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
    const baseUrl = this.configService.get('CLINIC_APP_URL');
    const url = `${baseUrl}/${path}`;
    return this.httpService.request({
      method,
      url,
      data,
      headers: {
        Authorization: getPrefixedToken(token.accessToken),
      },
    });
  }

  createPatient(data: { userId: string }, token: JwtToken): any {
    return this.createRequest(
      'POST',
      clinicClientAPI.createPatient,
      data,
      token,
    ).subscribe();
  }
}
