//===- sensors.spec.ts - Sensor routes spec --------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import createApp from "../../src/servers/http";
import { FastifyInstance } from "../../src/util/types";
import { HTTPInjectResponse } from "fastify";

describe("sensor routes", () => {
  let app: FastifyInstance;

  beforeAll(() => {
    app = createApp();
  });

  describe("GET '/pi/sensors'", () => {
    let response: HTTPInjectResponse;

    beforeEach(async () => {
      response = await app.inject({ method: "GET", url: "/pi/sensors" });
    });

    it("returns HTTP 200", () => {
      expect(response.statusCode).toBe(200);
    });

    it("defaults to content-type: application/json", () => {
      const headers: any = response.headers;
      expect(headers["content-type"]).toEqual(
        "application/json; charset=utf-8"
      );
    });
  });
});
