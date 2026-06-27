import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class HttpService {
  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const { data } = await axios.get<T>(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'JobRadar/1.0',
      },
      ...config,
    });

    return data;
  }
}