//===- plugins/pir-plugin.ts - PIR Plugin ----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as fp from "fastify-plugin";

import resources from "../resources";
import { FastifyInstance, NextCallback, RegisterOptions } from "../util/types";

interface PluginOptions extends RegisterOptions {
  params?: {
    simulate: boolean;
    frequency: number;
  };
}

const model = resources.device("pi").sensors.pir;
const pluginName = model.name;

function pirPlugin(
  fastify: FastifyInstance,
  options: PluginOptions,
  next: NextCallback
) {
  const params = options.params || { simulate: false, frequency: 5000 };
  let interval: NodeJS.Timeout;
  let conn: import("onoff").Gpio;

  async function start() {
    if (params.simulate) {
      simulate();
    } else {
      await connectHardware();
    }

    fastify.log.info("%s plugin started!", pluginName);
  }

  function stop() {
    if (params.simulate) {
      clearInterval(interval);
    } else {
      conn.unexport();
    }

    fastify.log.info("%s plugin stopped!", pluginName);
  }

  function simulate() {
    interval = setInterval(() => {
      model.value = !model.value;
      showValue();
    }, params.frequency);
  }

  async function connectHardware() {
    const onoff = await import("onoff");
    conn = new onoff.Gpio(model.gpio, "in", "both");
    conn.watch((err, value) => {
      if (err) throw err;
      model.value = !!value;
      showValue();
    });
    fastify.log.info("Hardware %s sensor started!", pluginName);
  }

  function showValue() {
    fastify.log.info(model.value ? "there is someone!" : "not anymore!");
  }

  fastify.ready(async () => {
    await start();
  });

  fastify.addHook("onClose", (instance, done) => {
    stop();
    done();
  });

  next();
}

export default fp(pirPlugin);
