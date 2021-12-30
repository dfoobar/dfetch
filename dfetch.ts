
import type { DFetchRequestConfig, DFetchConfig, DFetchResponseType, Data } from './types.ts';
import { HttpMethods } from './types.ts';
import { initURL, initFetchConfig, setFetchTimeout } from './utils.ts';

export default class DFetch {

  constructor(private _config: DFetchConfig = {}) {}

  static async #request<T = unknown>(config: DFetchRequestConfig): Promise<DFetchResponseType<T>>{
    const url = initURL(config);
    const fetchConfig = initFetchConfig(config);
    const timeoutId = setFetchTimeout(fetchConfig, config.timeout);
  
    const fetchResponse = await fetch(url, fetchConfig);
  
    timeoutId && clearInterval(timeoutId);
  
    let data: T | undefined = undefined;
  
    try {
      data = await fetchResponse.clone().json();
    } catch (ex) {
      data = await fetchResponse.clone().text() as unknown as T;
    }

    return {
      status: fetchResponse.status,
      statusText: fetchResponse.statusText,
      data,
      headers: fetchResponse.headers,
      config
    }
  }
  
  async request<T = unknown>(config: DFetchRequestConfig): Promise<DFetchResponseType<T>>{
    return DFetch.#request({ ...this._config, ...config  });
  }

  static async request<T = unknown>(config: DFetchRequestConfig): Promise<DFetchResponseType<T>>{
    return DFetch.#request(config);
  }
  
  async get<T = unknown>(url: string, config: DFetchRequestConfig = {}): Promise<DFetchResponseType<T>> {
    return this.request({ url, ...config, method: HttpMethods.GET });
  }

  async post<T = unknown>(url: string, data?: Data, config: DFetchRequestConfig = {}): Promise<DFetchResponseType<T>> {
    return this.request({ url, ...config , method: HttpMethods.POST, data });
  }

  async put<T = unknown>(url: string, data?: Data, config: DFetchRequestConfig = {}): Promise<DFetchResponseType<T>> {
    return this.request({ url, ...config , method: HttpMethods.PUT, data });
  }

  async delete<T = unknown>(url: string, data?: Data, config: DFetchRequestConfig = {}): Promise<DFetchResponseType<T>> {
    return this.request({ url, ...config , method: HttpMethods.DELETE, data });
  }

  async options<T = unknown>(url: string, data?: Data, config: DFetchRequestConfig = {}): Promise<DFetchResponseType<T>> {
    return this.request({ url, ...config , method: HttpMethods.OPTIONS, data });
  }

  async head<T = unknown>(url: string, data?: Data, config: DFetchRequestConfig = {}): Promise<DFetchResponseType<T>> {
    return this.request({ url, ...config , method: HttpMethods.HEAD, data });
  }

  async connect<T = unknown>(url: string, data?: Data, config: DFetchRequestConfig = {}): Promise<DFetchResponseType<T>> {
    return this.request({ url, ...config , method: HttpMethods.CONNECT, data });
  }

  async trace<T = unknown>(url: string, data?: Data, config: DFetchRequestConfig = {}): Promise<DFetchResponseType<T>> {
    return this.request({ url, ...config , method: HttpMethods.TRACE, data });
  }

  async patch<T = unknown>(url: string, data?: Data, config: DFetchRequestConfig = {}): Promise<DFetchResponseType<T>> {
    return this.request({ url, ...config , method: HttpMethods.PATCH, data });
  }

  static async get<T = unknown>(url: string, config: DFetchRequestConfig = {}): Promise<DFetchResponseType<T>> {
    return this.request({ url, ...config, method: HttpMethods.GET });
  }

  static async post<T = unknown>(url: string, data?: Data, config: DFetchRequestConfig = {}): Promise<DFetchResponseType<T>> {
    return this.request({ url, ...config , method: HttpMethods.POST, data });
  }

  static async put<T = unknown>(url: string, data?: Data, config: DFetchRequestConfig = {}): Promise<DFetchResponseType<T>> {
    return this.request({ url, ...config , method: HttpMethods.PUT, data });
  }

  static async delete<T = unknown>(url: string, data?: Data, config: DFetchRequestConfig = {}): Promise<DFetchResponseType<T>> {
    return this.request({ url, ...config , method: HttpMethods.DELETE, data });
  }

  static async options<T = unknown>(url: string, data?: Data, config: DFetchRequestConfig = {}): Promise<DFetchResponseType<T>> {
    return this.request({ url, ...config , method: HttpMethods.OPTIONS, data });
  }

  static async head<T = unknown>(url: string, data?: Data, config: DFetchRequestConfig = {}): Promise<DFetchResponseType<T>> {
    return this.request({ url, ...config , method: HttpMethods.HEAD, data });
  }

  static async connect<T = unknown>(url: string, data?: Data, config: DFetchRequestConfig = {}): Promise<DFetchResponseType<T>> {
    return this.request({ url, ...config , method: HttpMethods.CONNECT, data });
  }

  static async trace<T = unknown>(url: string, data?: Data, config: DFetchRequestConfig = {}): Promise<DFetchResponseType<T>> {
    return this.request({ url, ...config , method: HttpMethods.TRACE, data });
  }

  static async patch<T = unknown>(url: string, data?: Data, config: DFetchRequestConfig = {}): Promise<DFetchResponseType<T>> {
    return this.request({ url, ...config , method: HttpMethods.PATCH, data });
  }
}

