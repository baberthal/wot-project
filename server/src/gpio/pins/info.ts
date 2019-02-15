//===- gpio/info.ts - General Pi Info --------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as assert from "assert";

//  Constants {{{ //

/** Some useful constants for describing pins */
const V1_8 = "1V8";
const V3_3 = "3V3";
const V5 = "5V";
const GND = "GND";
const NC = "NC"; // not connected
const GPIO0 = "GPIO0";
const GPIO1 = "GPIO1";
const GPIO2 = "GPIO2";
const GPIO3 = "GPIO3";
const GPIO4 = "GPIO4";
const GPIO5 = "GPIO5";
const GPIO6 = "GPIO6";
const GPIO7 = "GPIO7";
const GPIO8 = "GPIO8";
const GPIO9 = "GPIO9";
const GPIO10 = "GPIO10";
const GPIO11 = "GPIO11";
const GPIO12 = "GPIO12";
const GPIO13 = "GPIO13";
const GPIO14 = "GPIO14";
const GPIO15 = "GPIO15";
const GPIO16 = "GPIO16";
const GPIO17 = "GPIO17";
const GPIO18 = "GPIO18";
const GPIO19 = "GPIO19";
const GPIO20 = "GPIO20";
const GPIO21 = "GPIO21";
const GPIO22 = "GPIO22";
const GPIO23 = "GPIO23";
const GPIO24 = "GPIO24";
const GPIO25 = "GPIO25";
const GPIO26 = "GPIO26";
const GPIO27 = "GPIO27";
const GPIO28 = "GPIO28";
const GPIO29 = "GPIO29";
const GPIO30 = "GPIO30";
const GPIO31 = "GPIO31";
const GPIO32 = "GPIO32";
const GPIO33 = "GPIO33";
const GPIO34 = "GPIO34";
const GPIO35 = "GPIO35";
const GPIO36 = "GPIO36";
const GPIO37 = "GPIO37";
const GPIO38 = "GPIO38";
const GPIO39 = "GPIO39";
const GPIO40 = "GPIO40";
const GPIO41 = "GPIO41";
const GPIO42 = "GPIO42";
const GPIO43 = "GPIO43";
const GPIO44 = "GPIO44";
const GPIO45 = "GPIO45";

//  }}} Constants //

export type PinMap = {
  /** pin number,   function, pullup */
  [pinno: number]: [string, boolean];
};

//  Pin Maps {{{ //

// prettier-ignore
const REV1_P1: PinMap = {
//#   function pullup  #   function pullup
  1:  [V3_3,   false], 2:  [V5,     false],
  3:  [GPIO0,  true],  4:  [V5,     false],
  5:  [GPIO1,  true],  6:  [GND,    false],
  7:  [GPIO4,  false], 8:  [GPIO14, false],
  9:  [GND,    false], 10: [GPIO15, false],
  11: [GPIO17, false], 12: [GPIO18, false],
  13: [GPIO21, false], 14: [GND,    false],
  15: [GPIO22, false], 16: [GPIO23, false],
  17: [V3_3,   false], 18: [GPIO24, false],
  19: [GPIO10, false], 20: [GND,    false],
  21: [GPIO9,  false], 22: [GPIO25, false],
  23: [GPIO11, false], 24: [GPIO8,  false],
  25: [GND,    false], 26: [GPIO7,  false],
};

// prettier-ignore
const REV2_P1: PinMap = {
  1:  [V3_3,   false], 2:  [V5,     false],
  3:  [GPIO2,  true],  4:  [V5,     false],
  5:  [GPIO3,  true],  6:  [GND,    false],
  7:  [GPIO4,  false], 8:  [GPIO14, false],
  9:  [GND,    false], 10: [GPIO15, false],
  11: [GPIO17, false], 12: [GPIO18, false],
  13: [GPIO27, false], 14: [GND,    false],
  15: [GPIO22, false], 16: [GPIO23, false],
  17: [V3_3,   false], 18: [GPIO24, false],
  19: [GPIO10, false], 20: [GND,    false],
  21: [GPIO9,  false], 22: [GPIO25, false],
  23: [GPIO11, false], 24: [GPIO8,  false],
  25: [GND,    false], 26: [GPIO7,  false],
};

// prettier-ignore
const REV2_P5: PinMap = {
  1:  [V5,     false], 2:  [V3_3,   false],
  3:  [GPIO28, false], 4:  [GPIO29, false],
  5:  [GPIO30, false], 6:  [GPIO31, false],
  7:  [GND,    false], 8:  [GND,    false],
};

// prettier-ignore
const PLUS_J8: PinMap = {
  1:  [V3_3,   false], 2:  [V5,     false],
  3:  [GPIO2,  true],  4:  [V5,     false],
  5:  [GPIO3,  true],  6:  [GND,    false],
  7:  [GPIO4,  false], 8:  [GPIO14, false],
  9:  [GND,    false], 10: [GPIO15, false],
  11: [GPIO17, false], 12: [GPIO18, false],
  13: [GPIO27, false], 14: [GND,    false],
  15: [GPIO22, false], 16: [GPIO23, false],
  17: [V3_3,   false], 18: [GPIO24, false],
  19: [GPIO10, false], 20: [GND,    false],
  21: [GPIO9,  false], 22: [GPIO25, false],
  23: [GPIO11, false], 24: [GPIO8,  false],
  25: [GND,    false], 26: [GPIO7,  false],
  27: [GPIO0,  false], 28: [GPIO1,  false],
  29: [GPIO5,  false], 30: [GND,    false],
  31: [GPIO6,  false], 32: [GPIO12, false],
  33: [GPIO13, false], 34: [GND,    false],
  35: [GPIO19, false], 36: [GPIO16, false],
  37: [GPIO26, false], 38: [GPIO20, false],
  39: [GND,    false], 40: [GPIO21, false],
};

// The following data is sourced from a combination of the following locations:
//
// http://elinux.org/RPi_HardwareHistory
// http://elinux.org/RPi_Low-level_peripherals
// https://git.drogon.net/?p=wiringPi;a=blob;f=wiringPi/wiringPi.c#l807
// https://www.raspberrypi.org/documentation/hardware/raspberrypi/revision-codes/README.md

// prettier-ignore
const PI_REVISIONS: { [k: number]: [string, string, { [k: string]: PinMap }] } = {
  // rev     model    pcb_rev headers
  0x2:      ["B",    "1.0",   { "P1": REV1_P1 },              ],
  0x3:      ["B",    "1.0",   { "P1": REV1_P1 },              ],
  0x4:      ["B",    "2.0",   { "P1": REV2_P1, "P5": REV2_P5 }],
  0x5:      ["B",    "2.0",   { "P1": REV2_P1, "P5": REV2_P5 }],
  0x6:      ["B",    "2.0",   { "P1": REV2_P1, "P5": REV2_P5 }],
  0x7:      ["A",    "2.0",   { "P1": REV2_P1, "P5": REV2_P5 }],
  0x8:      ["A",    "2.0",   { "P1": REV2_P1, "P5": REV2_P5 }],
  0x9:      ["A",    "2.0",   { "P1": REV2_P1, "P5": REV2_P5 }],
  0xd:      ["B",    "2.0",   { "P1": REV2_P1, "P5": REV2_P5 }],
  0xe:      ["B",    "2.0",   { "P1": REV2_P1, "P5": REV2_P5 }],
  0xf:      ["B",    "2.0",   { "P1": REV2_P1, "P5": REV2_P5 }],
  0x10:     ["B+",   "1.2",   { "J8": PLUS_J8 },              ],
  0x12:     ["A+",   "1.1",   { "J8": PLUS_J8 },              ],
  0x13:     ["B+",   "1.2",   { "J8": PLUS_J8 },              ],
  0x15:     ["A+",   "1.1",   { "J8": PLUS_J8 },              ],
};

//  }}} Pin Maps //

//  PinInfo {{{ //

/**
 * This class is used to represent information about a pin present on a GPIO
 * header.
 */
export class PinInfo {
  /**
   * An integer containing the physical pin number on the header (starting from
   * 1 in accordance with convention).
   */
  readonly number: number;

  /**
   * A string describing the function of the pin. Some common examples include
   * "GND" (for pins connecting to ground), "3V3" (for pins which output 3.3
   * volts), "GPIO9" (for GPIO9 in the Broadcom numbering scheme), etc.
   */
  readonly function: string;

  /**
   * A bool indicating whether the pin has a physical pull-up resistor
   * permanently attached (this is usually :data:`False` but GPIO2 and GPIO3 are
   * *usually* :data:`True`). This is used internally by gpiozero to raise errors
   * when pull-down is requested on a pin with a physical pull-up resistor.
   */
  readonly pullUp: boolean;

  /**
   * An integer indicating on which row the pin is physically located in the
   * header (1-based).
   */
  readonly row: number;

  /**
   * An integer indicating in which column the pin is physically located in the
   * header (1-based).
   */
  readonly col: number;

  constructor(no: number, fn: string, pull: boolean, row: number, col: number);
  constructor(other: PinInfo);
  constructor(...args: any[]) {
    if (typeof args[0] === "number") {
      this.number = args[0];
      this.function = args[1];
      this.pullUp = args[2];
      this.row = args[3];
      this.col = args[4];
    } else {
      const other: PinInfo = args[0];
      this.number = other.number;
      this.function = other.function;
      this.pullUp = other.pullUp;
      this.row = other.row;
      this.col = other.col;
    }
  }
}

//  }}} PinInfo //

//  HeaderInfo {{{ //

export class HeaderInfo {
  /**
   * The name of the header, typically as it appears silk-screened on the board
   * (e.g. "P1" or "J8").
   */
  readonly name: string;

  /**
   * The number of rows on the header.
   */
  readonly rows: number;

  /**
   * The number of columns on the header.
   */
  readonly columns: number;

  /**
   * A dictionary mapping physical pin numbers to `PinInfo`.
   */
  readonly pins: { [physical: number]: PinInfo };

  constructor(other: HeaderInfo);
  constructor(
    name: string,
    rows: number,
    cols: number,
    pins: { [n: number]: PinInfo }
  );
  constructor(
    nameOrOther: HeaderInfo | string,
    rows?: number,
    columns?: number,
    pins?: { [n: number]: PinInfo }
  ) {
    if (typeof nameOrOther === "string") {
      this.name = nameOrOther;
      this.rows = rows!;
      this.columns = columns!;
      this.pins = pins!;
    } else {
      this.name = nameOrOther.name;
      this.rows = nameOrOther.rows;
      this.columns = nameOrOther.columns;
      this.pins = nameOrOther.pins;
    }
  }
}

//  }}} HeaderInfo //

//  PiInfo {{{ //

export class PiInfo {
  //  Properties {{{ //
  /**
   * A string indicating the revision of the Pi. This is unique to each revision
   * and can be considered the "key" from which all other attributes are derived.
   *
   * However, in itself the string is fairly meaningless.
   */
  readonly revision: string;

  /**
   * A string containing the model of the Pi (for example, "B", "B+", "A+", "2B",
   * "CM" (for the Compute Module), or "Zero").
   */
  readonly model: string;

  /**
   * A string containing the PCB revision number which is silk-screened onto the
   * Pi (on some models).
   *
   * @note
   * This is primarily useful to distinguish between the model B revision 1.0 and
   * 2.0 (not to be confused with the model 2B) which had slightly different
   * pinouts on their 26-pin GPIO headers.
   */
  readonly pcbRevision: string;

  /**
   * A dictionary which maps header labels to `HeaderInfo` objects.
   *
   * For example, to obtain information about header P1 you would query
   * ``headers['P1']``. To obtain information about pin 12 on header J8 you would
   * query ``headers['J8'].pins[12]``.
   */
  readonly headers: { [header: string]: HeaderInfo };
  //  }}} Properties //

  //  Static Methods {{{ //

  static fromRevision(revision: number): PiInfo {
    // Check if we are using the old-style or new-style revision.
    let model: string;
    let pcbRevision: string;
    let rawHeaders: { [header: string]: PinMap };

    // see parseRevision_new
    if (revision & 0x800000) {
      [model, pcbRevision, rawHeaders] = parseRevision_new(revision);
    } else {
      [model, pcbRevision, rawHeaders] = parseRevision_old(revision);
    }

    const headers: { [header: string]: HeaderInfo } = {};
    for (const header in rawHeaders) {
      const headerData: PinMap = rawHeaders[header];

      const pins: { [k: number]: PinInfo } = {};
      for (const key in headerData) {
        const num = parseInt(key, 10);
        const [func, pullUp] = headerData[num];
        const [row, col] = divmod(num - 1, 2);
        pins[num] = new PinInfo(num, func, pullUp, row + 1, col + 1);
      }

      headers[header] = new HeaderInfo({
        name: header,
        rows: 2,
        columns: 2,
        pins
      });
    }

    return new this({
      revision: hex(revision),
      model,
      pcbRevision,
      headers
    });
  }

  //  }}} Static Methods //

  //  Instance Methods {{{ //
  constructor({
    revision,
    model,
    pcbRevision,
    headers
  }: {
    revision: string;
    model: string;
    pcbRevision: string;
    headers: { [header: string]: HeaderInfo };
  }) {
    this.revision = revision;
    this.model = model;
    this.pcbRevision = pcbRevision;
    this.headers = headers;
  }

  /**
   * Return the physical pins supporting the specified *function* as tuples of
   * ``[header, pin_number]`` where *header* is a string specifying the header
   * containing the *pin_number*.
   *
   * Note that the return value is a `Set` which is not indexable. Use
   * `physical_pin()` if you are expecting a single return value.
   *
   * @param fn The pin function you wish to search for. Usually this is
   *           something like "GPIO9" for Broadcom GPIO pin 9, or "GND"
   *           for all the pins connecting to electrical ground.
   */
  physicalPins(fn: string): Set<[string, number]> {
    const result = new Set<[string, number]>();

    for (const header in this.headers) {
      const info = this.headers[header];

      for (const n in info.pins) {
        const pin = info.pins[n];
        if (pin.function === fn) {
          result.add([header, pin.number]);
        }
      }
    }

    return result;
  }

  /**
   * Return the physical pin supporting the specified *function*. If no pins
   * support the desired *function*, this function raises :exc:`PinNoPins`.  If
   * multiple pins support the desired *function*, :exc:`PinMultiplePins` will be
   * raised (use :func:`physical_pins` if you expect multiple pins in the result,
   * such as for electrical ground).
   *
   * @param fn The pin function you wish to search for. Usually this is something
   *           like "GPIO9" for Broadcom GPIO pin 9.
   */
  physicalPin(fn: string): [string, number] {
    const result = this.physicalPins(fn);
    if (result.size > 1) {
      throw new Error(`Multiple pins can be used for ${fn}`);
    } else if (result.size) {
      return pop(result);
    } else {
      throw new Error(`No pins can be used for ${fn}`);
    }
  }

  /**
   * Returns a bool indicating whether a physical pull-up is attached to the pin
   * supporting the specified *function*.
   *
   * @param fn The pin function you wish to determine pull-up for. Usually this
   * is something like "GPIO9" for Broadcom GPIO pin 9.
   */
  isPulledUp(fn: string): boolean {
    try {
      const [header, pinno] = this.physicalPin(fn);
      return this.headers[header].pins[pinno].pullUp;
    } catch (e) {
      return false;
    }
  }

  /**
   * Parses a pin *spec*, returning the equivalent Broadcom GPIO port number or
   * throwing an Error if the spec does not represent a GPIO port.
   *
   * The *spec* may be given in any of the following forms:
   *   * An integer, which will be accepted as a GPIO number
   *   * 'GPIOn' where n is the GPIO number
   *   * 'WPIn' where n is the `wiringPi`_ pin number
   *   * 'BCMn' where n is the GPIO number (alias of GPIOn)
   *   * 'BOARDn' where n is the physical pin number on the main header
   *   * 'h:n' where h is the header name and n is the physical pin number
   *     (for example J8:5 is physical pin 5 on header J8, which is the main
   *     header on modern Raspberry Pis)
   *
   * _wiringPi: http://wiringpi.com/pins/
   */
  toGPIO(spec: number | string): number {
    if (typeof spec === "number") {
      assert(
        spec >= 0 && spec < 54,
        `Invalid GPIO port ${spec} specified (range 0..53)`
      );

      return spec;
    }

    spec = spec.toUpperCase();
    if (isdigit(spec)) return this.toGPIO(parseInt(spec, 10));

    if (spec.startsWith("GPIO") && isdigit(spec.slice(4))) {
      return this.toGPIO(parseInt(spec.slice(4), 10));
    } else if (spec.startsWith("BCM") && isdigit(spec.slice(3))) {
      return this.toGPIO(parseInt(spec.slice(3), 10));
    }

    throw new Error(`${spec} is not a valid pin spec`);
  }
  //  }}} Instance Methods //
}

//  }}} PiInfo //

//  piInfo() {{{ //

export function piInfo(revision?: number | string) {
  if (revision == null) {
    throw new Error("NOT IMPLEMENTED");
  } else {
    if (typeof revision === "string") {
      revision = parseInt(revision, 16);
    } else {
      revision = Math.floor(revision);
    }

    return PiInfo.fromRevision(revision);
  }
}

//  }}} piInfo() //

//  Helper Methods {{{ //

function pop<T>(set: Set<T>): T {
  const i = set.values();
  return i.next().value;
}

function isdigit(str: string): boolean {
  return /^\d+$/.test(str);
}

function floordiv(x: number, y: number): number {
  return Math.floor(x / y);
}

function divmod(x: number, y: number): [number, number] {
  return [floordiv(x, y), x % y];
}

function hex(n: number): string {
  return ("0000" + n.toString(16)).slice(-4);
}

const _THROW_IF_NOT_FOUND = new Object();

function get<T extends { [k: string]: V } | { [k: number]: V }, V>(
  obj: T,
  key: string | number,
  notFoundValue?: V
): V;
function get(
  obj: any,
  key: string | number,
  notFoundValue: any = _THROW_IF_NOT_FOUND
) {
  if (key in obj) {
    return obj[key];
  } else if (notFoundValue === _THROW_IF_NOT_FOUND) {
    throw new Error(`${key} is not in object!`);
  } else {
    return notFoundValue;
  }
}

type ParseResult = [string, string, { [k: string]: PinMap }];

function parseRevision_new(revision: number): ParseResult {
  // New-style revision, parse information from bit-pattern:
  //
  // MSB -----------------------> LSB
  // uuuuuuuuFMMMCCCCPPPPTTTTTTTTRRRR
  //
  // uuuuuuuu - Unused
  // F        - New flag (1=valid new-style revision, 0=old-style)
  // MMM      - Memory size (0=256, 1=512, 2=1024)
  // CCCC     - Manufacturer (0=Sony, 1=Egoman, 2=Embest, 3=Sony Japan, 4=Embest, 5=Stadium)
  // PPPP     - Processor (0=2835, 1=2836, 2=2837)
  // TTTTTTTT - Type (0=A, 1=B, 2=A+, 3=B+, 4=2B, 5=Alpha (??), 6=CM,
  //                  8=3B, 9=Zero, 10=CM3, 12=Zero W, 13=3B+, 14=3A+)
  // RRRR     - Revision (0, 1, 2, etc.)
  const revcodeMemory = (revision & 0x700000) >> 20;
  const revcodeManufacturer = (revision & 0xf0000) >> 16;
  const revcodeProcessor = (revision & 0xf000) >> 12;
  const revcodeType = (revision & 0xff0) >> 4;
  const revcodeRevision = revision & 0x0f;

  const model: string = get(
    {
      0: "A",
      1: "B",
      2: "A+",
      3: "B+",
      4: "2B",
      6: "CM",
      8: "3B",
      9: "Zero",
      10: "CM3",
      12: "Zero W",
      13: "3B+",
      14: "3A+",
      16: "CM3+"
    },
    revcodeType,
    "???"
  );

  let pcbRevision: string;
  if (model === "A" || model === "B") {
    pcbRevision = get(
      { 0: "1.0", 1: "1.0", 2: "2.0" },
      revcodeRevision,
      "Unknown"
    );
  } else {
    pcbRevision = `1.${revcodeRevision}`;
  }

  const headers: { [k: string]: PinMap } = get(
    {
      A: { P1: REV2_P1, P5: REV2_P5 },
      B: pcbRevision === "1.0" ? { P1: REV1_P1 } : { P1: REV2_P1, P5: REV2_P5 }
    },
    model,
    { J8: PLUS_J8 }
  );

  return [model, pcbRevision, headers];
}

function parseRevision_old(revision: number): ParseResult {
  if (revision in PI_REVISIONS) {
    const [model, pcbRevision, headers] = PI_REVISIONS[revision];
    return [model, pcbRevision, headers];
  }

  throw new Error(`unknown old-style revision "${revision.toString(16)}"`);
}

//  }}} Helper Methods //
