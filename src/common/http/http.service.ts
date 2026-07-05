import { Injectable } from '@nestjs/common';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

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

  async head(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return axios.head(url, {
      timeout: 5000,
      maxRedirects: 5,
      validateStatus: () => true,
      headers: {
        'User-Agent': 'JobRadar/1.0',
      },
      ...config,
    });
  }

  async post<T>(
    url: string,
    body: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {

      const { data } =
      await axios.post<T>(
          url,
          body,
          {
              timeout:10000,

              headers:{
                  "User-Agent":"HireScope",

                  "Content-Type":
                  "application/json",
              },

              ...config,
          },
      );

      return data;
  }
}