//===- plugins/sequelize-plugin.ts - Sequelize Fastify Plugin --------------===//
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

export interface PluginOptions extends RegisterOptions, ISequelizeConfig {
  /** Default: "sequelize" */
  instance?: string;
  /** Default: `true` */
  autoConnect?: boolean;
}

function plugin(fastify: FastifyInstance, opts: PluginOptions, next: Next) {
  const instance = opts.instance || "sequelize";
  const autoConnect = opts.autoConnect != null ? opts.autoConnect : true;

  delete opts.instance;
  delete opts.autoConnect;

  const sequelize = new Sequelize(opts);

  if (autoConnect) {
    return sequelize.authenticate().then(decorate);
  }

  decorate();

  return Promise.resolve();

  function decorate() {
    fastify.decorate(instance, sequelize);
    fastify.addHook("onClose", (_, done) => {
      sequelize
        .close()
        .then(done)
        .catch(done);
    });
  }
}

export default fp(plugin);
