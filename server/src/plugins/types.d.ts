//===- plugins/types.d.ts - Types for this plugin --------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

/// <reference types="fastify" />

import { Resources } from "../resources/resources";
import { LinksConfig } from "./links-plugin";

declare module "fastify" {
  interface FastifyInstance {
    resources: Resources;
  }

  interface FastifyRequest<HttpRequest> {}

  interface FastifyReply<HttpResponse> {
    links(config: LinksConfig): this;
  }
}
