//===- core/http/request_options.ts - HTTP Request Options -----------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export type HttpRequestMethod =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH";

export type HttpResponseType =
  | "arraybuffer"
  | "blob"
  | "document"
  | "json"
  | "text"
  | "stream";

export interface HttpRequestOptions {
  headers?: string[][] | { [key: string]: string };
  params?: string[][] | { [key: string]: string };
  body?: any; // TODO
  timeout?: number;
  responseType?: HttpResponseType;
}
