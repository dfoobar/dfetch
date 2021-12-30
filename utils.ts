import { urlJoin } from "https://deno.land/x/url_join@1.0.0/mod.ts";
import type { DFetchRequestConfig, Data } from './types.ts';

const isSuitableData = (data: Data): data is string | FormData | URLSearchParams => 
  typeof data === "string" ||
  data instanceof FormData ||
  data instanceof URLSearchParams;

function setHeaders(headers: { [key: string]: string; }, fetchConfig: RequestInit) {
  if(headers) {
    const _headers: Headers = new Headers();
    Object.keys(headers).forEach((header) => {
      if(headers && headers[header]) {
        _headers.set(header, headers[header]);
      }
    });
    fetchConfig.headers = _headers;
  }
}

function setData(data: Data | undefined, fetchConfig: RequestInit, headers: { [key: string]: string; }) {
  if(data && fetchConfig.method !== "get") {
    if(isSuitableData(data)) {
      fetchConfig.body = data;
    } else {
      try {
        fetchConfig.body = JSON.stringify(data);
        headers["Accept"] = "application/json";
        headers["Content-Type"] = "application/json";
      } catch(ex) { }
    }
  }
}

export function initURL(config: DFetchRequestConfig) {
  const {
    url = "/",
    baseURL,
    params
  } = config;

  const _url = new URL(baseURL ? urlJoin(baseURL, url) : url);

  params && Object.entries(params)
    .map(([key, value]) => [encodeURIComponent(key), encodeURIComponent(value as string)])
    .forEach(([key, value]) => _url.searchParams.append(key, value));

  return _url;
}

export function initFetchConfig(config: DFetchRequestConfig) {
  const {
    headers = {},
    method,
    data,
    redirect,
  } = config;

  const fetchConfig: RequestInit = {
    method: !method ? "get" : method,
    redirect: redirect || undefined
  };
  setData(data, fetchConfig, headers);
  setHeaders(headers, fetchConfig);
  return fetchConfig;
}

export function setFetchTimeout(fetchConfig: RequestInit, timeout: number | undefined) {
  const controller = new AbortController();
  fetchConfig.signal = controller.signal;

  let timeoutCounter: number = 0;

  if((timeout || 0) > 0) {
    timeoutCounter = setTimeout(() => {
      timeoutCounter = 0;
      controller.abort();
    }, timeout);
  }
  return timeoutCounter;
}