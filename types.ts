type GenericData<T = unknown> = {
  [key: string]: T
}

export type Data = string | GenericData | FormData | GenericData[] | unknown;

export type DFetchConfig = {
  headers?: GenericData<string>;
  params?: GenericData;
  timeout?: number;
  redirect?: RequestRedirect;
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