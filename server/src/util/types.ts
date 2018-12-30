//===- util/types.ts - Misc re-exported types and type aliases -------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as http from "http";
import * as fastify from "fastify";

export type HttpRequest = http.IncomingMessage;
export type HttpResponse = http.ServerResponse;
export type HttpServer = http.Server;

export type NextCallback = (err?: fastify.FastifyError) => void;

export type RegisterOptions = fastify.RegisterOptions<
  HttpServer,
  HttpRequest,
  HttpResponse
>;

export type FastifyReply = fastify.FastifyReply<HttpRequest>;

export {
  FastifyContext,
  FastifyError,
  FastifyInstance,
  Logger,
  RouteShorthandOptions
} from "fastify";
