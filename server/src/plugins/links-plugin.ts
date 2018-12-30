//===- plugins/links-plugin.ts - Plugin for res.links() --------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as fp from "fastify-plugin";

import {
  FastifyReply,
  FastifyInstance,
  RegisterOptions,
  NextCallback as Next
} from "../util/types";

export interface PluginOptions extends RegisterOptions {}

export interface LinksConfig {
  [key: string]: string;
}

function links(this: FastifyReply, links: LinksConfig): FastifyReply {
  let link = this.getHeader("Link") || "";
  if (link) link += ", ";
  return this.header(
    "Link",
    link +
      Object.keys(links)
        .map(rel => `<${links[rel]}>; rel="${rel}"`)
        .join(", ")
  );
}

function plugin(fastify: FastifyInstance, opts: PluginOptions, next: Next) {
  fastify.decorateReply("links", links);
  next();
}

export default fp(plugin);
