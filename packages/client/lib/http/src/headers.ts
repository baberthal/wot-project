//===- core/http/src/headers.ts - HTTP Headers Class -----------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export type HttpHeadersInit =
  | HttpHeaders
  | string[][]
  | { [key: string]: string | string[] };

export class HttpHeaders {
  private headers: Map<string, string[]>;

  constructor(init?: HttpHeadersInit) {
    if (!init) {
      this.headers = new Map();
    } else if (init instanceof HttpHeaders) {
      this.headers = new Map(init.headers);
    } else if (Array.isArray(init)) {
    } else {
      this.headers = new Map(init);
    }
  }

  append(name: string, value: string): void {
    throw new Error("Not implemented!");
  }

  delete(name: string): void {
    throw new Error("Not implemented!");
  }

  get(name: string): string | null {
    throw new Error("Not implemented!");
  }

  has(name: string): boolean {
    throw new Error("Not implemented!");
  }

  set(name: string, value: string): void {
    throw new Error("Not implemented!");
  }

  forEach(
    callback: (value: string, key: string, parent: HttpHeaders) => void,
    thisArg?: any
  ): void {
    throw new Error("Not implemented!");
  }
}
