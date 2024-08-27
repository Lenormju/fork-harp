/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

declare namespace Apps.HttpClient {
  export interface CacheSettings {
    enabled?: boolean;
    transport?: Service;
    controller?: Service;
    storage?: Service;
  }
  export interface Service {
    base?: string | null;
    type?: string | null;
    constructor?: string | null;
    arguments?: {
      [k: string]: unknown;
    } | null;
    [k: string]: unknown;
  }
  export interface HttpClientSettings {
    base?: string | null;
    type?: string;
    constructor?: string | null;
    arguments?: Arguments;
    cache?: CacheSettings;
    transport?: Service;
    proxy_transport?: Service;
    [k: string]: unknown;
  }
  export interface Arguments {
    [k: string]: unknown;
  }
}
