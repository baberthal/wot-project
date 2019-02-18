//===- gpio/devices/dht_sensor.ts - DHT Sensor Device ----------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { EventEmitter } from "events";
import { use } from "typescript-mix";

import { GPIODevice } from "../device";

export type DHTSensorType = 11 | 22;

export interface DHTSensor extends GPIODevice, EventEmitter {}
export class DHTSensor extends GPIODevice {
  private _dhtType: DHTSensorType;
  private _reading: boolean;

  private _sensorState: DHTSensorState;
  private lastHighTick: number = 0;

  @use(EventEmitter) this: any;

  constructor(
    pin: string | number,
    type: DHTSensorType = 22,
    options: {} = {}
  ) {
    super(pin, options);
    EventEmitter.call(this);

    this._dhtType = type;
    this._sensorState = new DHTSensorState();

    this.pin.mode = "output";
    this.pin.pull = "floating";

    this._reading = false;
    this.lastHighTick = 0;

    this.pin.callback = (level, tick) => {
      if (level == 0) {
        const diff = this.pin.factory.ticksDiff(this.lastHighTick, tick);

        // Edge length determines if bit is 1 or 0.
        let val = 0;
        // low bit is between 26 and 28 µs
        // high bit is 70 µs
        // So we check on the value in between to avoid small differences
        if (diff >= 50) {
          val = 1;

          // Bad bit?
          if (diff >= 200) {
            this._sensorState.checksum = 256; // Force bad checksum.
          }
        }

        if (this._sensorState.bits < 0) {
          // header bits
          // we don't need to do anything with these
        } else if (this._sensorState.bits < 8) {
          // in humidity high byte
          this._sensorState.rhum.high =
            (this._sensorState.rhum.high << 1) + val;
        } else if (this._sensorState.bits < 16) {
          // in humidity low byte
          this._sensorState.rhum.low = (this._sensorState.rhum.low << 1) + val;
        } else if (this._sensorState.bits < 24) {
          // in temp high byte
          this._sensorState.temp.high =
            (this._sensorState.temp.high << 1) + val;
        } else if (this._sensorState.bits < 32) {
          // in temp low byte
          this._sensorState.temp.low = (this._sensorState.temp.low << 1) + val;
        } else {
          // In checksum byte.
          this._sensorState.checksum = (this._sensorState.checksum << 1) + val;

          if (this._sensorState.bits == 39) {
            // 40th bit received.
            this._endReading();

            const total =
              this._sensorState.rhum.high +
              this._sensorState.rhum.low +
              this._sensorState.temp.high +
              this._sensorState.temp.low;

            // Is checksum ok?
            if ((total & 255) == this._sensorState.checksum) {
              const res =
                type == 11 ? this._interpret11() : this._interpret22();

              this.emit("result", res);
            } else {
              this.emit("badChecksum");
            }
          }
        }

        ++this._sensorState.bits;
      } else if (level === 1) {
        this.lastHighTick = tick;
      }
    };
  }

  read() {
    this._startReading();
  }

  private _startReading(): boolean {
    if (this._reading) {
      return false;
    }

    this.emit("start");
    this.pin.state = 0;

    setTimeout(() => {
      this._sensorState.reset();
      this.pin.state = 1;
      this.lastHighTick = this.pin.factory.ticks();

      this.pin.mode = "input";
      this.pin.enableEventDetect();
    }, 18);

    return true;
  }

  private _endReading() {
    this._reading = false;
    this.pin.disableEventDetect();
    this.pin.mode = "output";
    this.emit("end");
  }

  private _interpret11() {
    const humidity = this._sensorState.rhum.high;
    const temperature = this._sensorState.temp.high;

    return { temperature, humidity };
  }

  private _interpret22() {
    const { rhum, temp } = this._sensorState;

    const humidity = ((rhum.high << 8) + rhum.low) * 0.1;
    // check the sign
    const mult = temp.high & 128 ? -0.1 : 0.1;
    temp.high = temp.high & 127; // remove the sign bit
    const temperature = ((temp.high << 8) + temp.low) * mult;

    return { temperature, humidity };
  }
}

class DHTSensorState {
  bits: number = 0;

  rhum: {
    high: number;
    low: number;
  } = { high: 0, low: 0 };

  temp: {
    high: number;
    low: number;
  } = { high: 0, low: 0 };

  checksum: number = 0;

  reset() {
    this.bits = -2; // first 2 low bits are ACK
    this.rhum.high = 0;
    this.rhum.low = 0;
    this.temp.high = 0;
    this.temp.low = 0;
    this.checksum = 0;
  }
}
