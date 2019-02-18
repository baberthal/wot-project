//===- db/plugin.ts - Database Fastify Plugin ------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as fp from "fastify-plugin";
import { ISequelizeConfig, Sequelize } from "sequelize-typescript";

import {
  FastifyInstance,
  NextCallback as Next,
  RegisterOptions
} from "../util/types";

export interface PluginOptions extends RegisterOptions {
  /** Default: `true` */
  autoConnect?: boolean;
}

function plugin(
  fastify: FastifyInstance,
  opts: PluginOptions & ISequelizeConfig
): any;
function plugin(
  fastify: FastifyInstance,
  opts: PluginOptions & { instance: Sequelize }
): any;
function plugin(fastify: FastifyInstance, opts: PluginOptions) {
  const autoConnect = opts.autoConnect != null ? opts.autoConnect : true;
  delete opts.autoConnect;

  let instance: Sequelize;
  if (opts.instance) {
    instance = opts.instance;
    delete opts.instance;
  } else {
    instance = new Sequelize(opts as ISequelizeConfig);
  }

  if (autoConnect) {
    return instance.authenticate().then(decorate);
  }

  decorate();
  return Promise.resolve();

  function decorate() {
    fastify.decorate("sequelize", instance);
    fastify.addHook("onClose", (_, done) => {
      instance
        .close()
        .then(done)
        .catch(done);
    });
  }
}

export default fp(plugin);
