//===- core/fetch-json.ts - Helper function to fetch json data -------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export function fetchJson<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const headers = { accept: "application/json" };

  if (init == null) {
    init = { headers };
  } else {
    if (typeof init.headers === "undefined") {
      init.headers = headers;
    } else if (Array.isArray(init.headers)) {
      init.headers.push(["accept", "application/json"]);
    } else if (init.headers instanceof Headers) {
      init.headers.append("accept", "application/json");
    }
  }

  return fetch(input, init).then(stream => stream.json());
}

export default fetchJson;
