//===- plugins/led_plugin.ts - LED Plugin ----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as fp from "fastify-plugin";

// import { LedController } from "../controllers/led_controller";
import resources from "../resources";
import { FastifyInstance, NextCallback, RegisterOptions } from "../util/types";

interface PluginOptions extends RegisterOptions {
  params?: {
    simulate: boolean;
    frequency: number;
  };
}

const model = resources.device("pi").actuators["leds"].find("1");
const pluginName = model.name;

function ledPlugin(
  fastify: FastifyInstance,
  options: PluginOptions,
  next: NextCallback
) {
  const params = options.params || { simulate: false, frequency: 5000 };
  let interval: NodeJS.Timeout;
  let conn: import("onoff").Gpio;

  async function start() {
    model.onValueChange(val => {
      fastify.log.info("Value changed for %s: %s", pluginName, val);
      toggleLED(val as boolean);
    });

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
      // Switch value on a regular basis
      model.value = !model.value;
      showValue();
    }, params.frequency);

    fastify.log.info("Simulated %s actuator started!", pluginName);
  }

  async function connectHardware() {
    const onoff = await import("onoff");
    conn = new onoff.Gpio(model.gpio, "out");
    fastify.log.info("Hardware %s actuator started!", pluginName);
  }

  function toggleLED(value: boolean) {
    if (!params.simulate) {
      conn.write(value === true ? 1 : 0, () => {
        fastify.log.info("Changed value of %s to %s", pluginName, value);
      });
    }
  }

  function showValue() {
    fastify.log.info("%s current value: %s", pluginName, model.value);
  }

  fastify.ready(async () => {
    await start();
  });

  fastify.addHook("onClose", (instance, done) => {
    stop();
    done();
  });

  fastify.wotPluginManager.onClose(() => {
    stop();
  });

  next();
}

export default fp(ledPlugin);
