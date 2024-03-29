import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Method } from 'axios';

import { JwtToken } from '@vp-clients-app/common-pkg';

import {
  clinicClientAPI,
  getPrefixedToken,
} from 'src/http-client/api.client.enum';

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
    const host = this.configService.get('CLINIC_SERVICE_HOST');
    const port = this.configService.get('CLINIC_SERVICE_PORT');
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

  createPatient(data: { userId: string }, token: JwtToken): any {
    return this.createRequest(
      'POST',
      clinicClientAPI.createPatient,
      data,
      token,
    ).subscribe();
  }
}
