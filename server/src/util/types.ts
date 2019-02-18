//===- util/types.ts - Misc re-exported types and type aliases -------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as fastify from "fastify";
import * as http from "http";

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

export type NonAbstract<T> = { [P in keyof T]: T[P] };

export type NonAbstractConstructorOf<T, U> = { new (): T } & NonAbstract<U>;
