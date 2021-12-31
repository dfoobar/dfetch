
export type Data = string | Record<string, unknown> | FormData | Record<string, unknown>[];

export type DFetchConfig = {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  timeout?: number;
  redirect?: RequestRedirect;
  paramsSerializer?: Function;
}

export type DFetchRequestConfig = DFetchConfig & {
  url?: string;
  baseURL?: string;
  method?: HttpMethods | `${HttpMethods}` | Uppercase<`${HttpMethods}`> | Capitalize<`${HttpMethods}`> ;
  data?: Data;
}

export type DFetchResponseType<T = unknown> = {
  status: number;
  statusText: string;
  data?: T;
  headers: Headers;
  config: DFetchRequestConfig;
}

export enum HttpMethods {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  OPTIONS = "options",
  HEAD = "head",
  CONNECT = "connect",
  TRACE = "trace",
  PATCH = "patch",
}