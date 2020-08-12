import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface RequestConfig extends AxiosRequestConfig {}
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Response<T = any> extends AxiosResponse<T> {}

export class Request {
  constructor(private readonly request = axios) {}

  public async get<T>(
    url: string,
    config: RequestConfig = {}
  ): Promise<Response<T>> {
    return await this.request.get<T, Response<T>>(url, config)
  }
}
