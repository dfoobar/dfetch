import { urlJoin } from "https://deno.land/x/url_join@1.0.0/mod.ts";
import type { DFetchRequestConfig, Data } from './types.ts';

const isSuitableData = (data: Data): data is string | FormData | URLSearchParams => 
  typeof data === "string" ||
  data instanceof FormData ||
  data instanceof URLSearchParams;

function setData(fetchConfig: RequestInit, headers: Record<string, string>, data?: Data) {
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
    params,
    paramsSerializer
  } = config;
  
  const urlString = baseURL ? urlJoin(baseURL, url) : url;
  let _url: URL = new URL(urlString);

  if (!params) return _url;

  if (paramsSerializer) {
    _url = new URL(urlJoin(urlString, `?${paramsSerializer(params)}`))
  } else {
    Object.entries(params)
      .filter(([,value]) => value !== undefined)
      .map(([key, value]) => [encodeURIComponent(key), encodeURIComponent(value as string)])
      .forEach(([key, value]) => _url.searchParams.append(key, value));
  }

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
  
  setData(fetchConfig, headers, data);

  fetchConfig.headers = Object.entries(headers)
    .reduce((h, [k, v]) => (h.set(k, v), h), new Headers());
    
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