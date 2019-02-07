//===- config.spec.ts - -  -------------------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { ResourcesConfig } from "src/resources/config";

import * as testJsonConfig from "./test-resources.json";

describe(ResourcesConfig, () => {
  describe("#constructor", () => {
    it("works and has a device 'pi'", () => {
      const config = new ResourcesConfig(testJsonConfig);
      expect(config.devices["pi"]).not.toBeNull();
    });

    it("works when no args are passed", () => {
      const config = new ResourcesConfig();
      expect(config.devices["pi"]).not.toBeNull();
    });
  });

  describe(".load", () => {
    const path = require.resolve("./test-resources.json");
    const badPath = require.resolve("./bad-resources.json");

    describe("with a valid path to a proper json object", () => {
      it("works", async () => {
        const cfg = await ResourcesConfig.load(path);
        expect(cfg.devices["pi"].name).toEqual("WoT Pi");
      });

      it("returns a promise", () => {
        const promise = ResourcesConfig.load(path);
        expect(promise).toBeInstanceOf(Promise);
      });

      it("resolves a ResourcesConfig", () => {
        expect(ResourcesConfig.load(path)).resolves.toBeInstanceOf(
          ResourcesConfig
        );
      });
    });

    describe("with a path that does not exist", () => {
      it("rejects the promise ", () => {
        expect(ResourcesConfig.load("not-a-file.json")).rejects.toThrow(
          "ENOENT"
        );
      });
    });

    describe("with a path that exists to malformed json", () => {
      it("rejects the promise", () => {
        expect(ResourcesConfig.load(badPath)).rejects.toThrowError(SyntaxError);
      });
    });
  });
});
