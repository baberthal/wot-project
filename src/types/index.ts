//===- types/index.ts - Extra Types Exports --------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { FastifyInstance, Plugin as FastifyPlugin } from "fastify";
import {
  IncomingMessage as HttpRequest,
  Server as HttpServer,
  ServerResponse as HttpResponse
} from "http";

export type Server = FastifyInstance<HttpServer, HttpRequest, HttpResponse>;

export type Plugin<T> = FastifyPlugin<HttpServer, HttpRequest, HttpResponse, T>;
