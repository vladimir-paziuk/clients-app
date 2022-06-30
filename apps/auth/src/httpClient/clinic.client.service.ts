import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Method } from 'axios';

import { JwtToken } from '@vp-clients-app/common-pkg';

const clinicClientAPI = {
  createPatient: 'patients',
};
const baseUrl = `http://localhost`;
const getPrefixedToken = (token: string) => `Bearer ${token}`;

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
    const port = this.configService.get('CLINIC_APP_PORT');
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

  createPatient(data: { userId: string }, token: JwtToken): any {
    return this.createRequest(
      'POST',
      clinicClientAPI.createPatient,
      data,
      token,
    ).subscribe();
  }
}
