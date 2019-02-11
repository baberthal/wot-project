//===- resources/pins/data.ts - Board Info ---------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { isdigit } from "../../util/ctype";

export class PinInfo {
  number: number;
  function: string;
  pullUp: boolean;
  row: number;
  col: number;

  constructor(n: number, f: string, pullUp: boolean, row: number, col: number) {
    this.number = n;
    this.function = f;
    this.pullUp = pullUp;
    this.row = row;
    this.col = col;
  }
}

export class HeaderInfo {
  name: string;
  rows: number;
  columns: number;
  pins: Record<number, PinInfo>;

  constructor(
    name: string,
    rows: number,
    cols: number,
    pins: Record<number, PinInfo> = {}
  ) {
    this.name = name;
    this.rows = rows;
    this.columns = cols;
    this.pins = pins;
  }
}

// export class PiBoardInfo {
//   revision: string;
//   model: string;
//   pcb_revision: string;
//   released: string;
//   soc: string;
//   manufacturer: string;
//   memory: number;
//   storage: string;
//   usb: number;
//   ethernet: number;
//   wifi: boolean;
//   bluetooth: boolean;
//   csi: number;
//   dsi: number;
//   headers: Record<string, HeaderInfo>;

//   static fromRevision(revision: number): PiBoardInfo {
//     if (revision & 0x800000) {
//       // Borrowed from:
//       // https://github.com/RPi-Distro/python-gpiozero/blob/master/gpiozero/pins/data.py
//       const revcodeMemory = (revision & 0x700000) >> 20;
//       const revcodeManufacturer = (revision & 0xf0000) >> 16;
//       const revcodeProcessor = (revision & 0xf000) >> 12;
//       const revcodeType = (revision & 0xff0) >> 4;
//       const revcodeRevision = revision & 0x0f;

//       const model =
//         ({
//           0: "A",
//           1: "B",
//           2: "A+",
//           3: "B+",
//           4: "2B",
//           6: "CM",
//           8: "3B",
//           9: "Zero",
//           10: "CM3",
//           12: "Zero W",
//           13: "3B+",
//           14: "3A+",
//           16: "CM3+"
//         } as Record<number, string>)[revcodeType] || "???";

//       let pcbRevision: string;
//       if (model === "A" || model === "B") {
//         pcbRevision =
//           ({
//             0: "1.0",
//             1: "1.1",
//             2: "2.0"
//           } as Record<number, string>)[revcodeRevision] || "Unknown";
//       } else {
//         pcbRevision = `1.${revcodeRevision}`;
//       }

//       const soc =
//         ({
//           0: "BCM2835",
//           1: "BCM2836",
//           2: "BCM2837"
//         } as Record<number, string>)[revcodeProcessor] || "Unknown";

//       const manufacturer =
//         ({
//           0: "Sony",
//           1: "Egoman",
//           2: "Embest",
//           3: "Sony Japan",
//           4: "Embest",
//           5: "Stadium"
//         } as Record<number, string>)[revcodeManufacturer] || "Unknown";

//       const memory =
//         ({
//           0: 256,
//           1: 512,
//           2: 1024
//         } as Record<number, number>)[revcodeMemory] || null;

//       const released =
//         ({
//           A: "2013Q1"
//         } as Record<string, string>)[model] || "Unknown";
//     }
//   }

//   constructor(
//     revision: string,
//     model: string,
//     pcb_revision: string,
//     released: string,
//     soc: string,
//     manufacturer: string,
//     memory: number,
//     storage: string,
//     usb: number,
//     ethernet: number,
//     wifi: boolean,
//     bluetooth: boolean,
//     csi: number,
//     dsi: number,
//     headers: Record<string, HeaderInfo>
//   ) {
//     this.revision = revision;
//     this.model = model;
//     this.pcb_revision = pcb_revision;
//     this.released = released;
//     this.soc = soc;
//     this.manufacturer = manufacturer;
//     this.memory = memory;
//     this.storage = storage;
//     this.usb = usb;
//     this.ethernet = ethernet;
//     this.wifi = wifi;
//     this.bluetooth = bluetooth;
//     this.csi = csi;
//     this.dsi = dsi;
//     this.headers = headers;
//   }

//   physicalPins(func: string): Set<Record<string, number>> {
//     const set = new Set<Record<string, number>>();

//     // FIXME: this could be more elegant
//     Object.entries(this.headers).forEach(([header, info]) => {
//       const pins = Object.values(info.pins);
//       pins.forEach(pin => {
//         if (pin.function === func) {
//           set.add({ [header]: pin.number });
//         }
//       });
//     });

//     return set;
//   }

//   physicalPin(func: string) {
//     const result = this.physicalPins(func);
//     if (result.size > 1) {
//       throw new Error(`Multiple pins can be used for ${func}`);
//     } else if (result) {
//       return result.entries();
//     } else {
//       throw new Error(`No pins can be used for ${func}`);
//     }
//   }

//   pulledUp(func: string) {}

//   toGPIO(spec: string | number): number {
//     if (typeof spec === "number") {
//       if (spec < 0 || spec > 53) {
//         throw new Error(`Invalid GPIO port ${spec} specified (range 0..53)`);
//       }

//       return spec;
//     }

//     spec = spec.toUpperCase();
//     if (isdigit(spec)) return this.toGPIO(parseInt(spec, 10));

//     if (spec.startsWith("GPIO") && isdigit(spec.slice(4))) {
//       return this.toGPIO(parseInt(spec.slice(4), 10));
//     } else if (spec.startsWith("BCM") && isdigit(spec.slice(3))) {
//       return this.toGPIO(parseInt(spec.slice(3), 10));
//     }

//     throw new Error(`'${spec}' is not a valid pin spec`);
//   }
// }
