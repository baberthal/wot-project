//===- resources/exceptions.ts - Exception Classes -------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

/** Base class for all errors in GPIO. */
export class GPIOError extends Error {
  constructor(message: string) {
    super(message);
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

/** Thrown when an operation is attempted on a closed device. */
export class DeviceClosed extends GPIOError {}

/** Base class for errors related to pin implementations. */
export class PinError extends GPIOError {}

/**
 * Error raised when attempting to change the function of a pin to an invalid
 * value.
 */
export class PinInvalidFunction extends PinError {}

/** Error raised when attempting to assign an invalid state to a pin */
export class PinInvalidState extends PinError {}

/** Error raised when attempting to assign an invalid pull-up to a pin */
export class PinInvalidPull extends PinError {}

/** Error raised when attempting to assign an invalid edge detection to a pin */
export class PinInvalidEdges extends PinError {}

/** Error raised when attempting to assign an invalid bounce time to a pin */
export class PinInvalidBounce extends PinError {}

/** Error raised when attempting to set a read-only pin */
export class PinSetInput extends PinError {}

/** Error raised when attempting to set the pull of a pin with fixed pull-up */
export class PinFixedPull extends PinError {}

/** Error raised when attempting to use edge detection on unsupported pins */
export class PinEdgeDetectUnsupported extends PinError {}

/** Error raised when attempting to obtain a pin interface on unsupported pins */
export class PinUnsupported extends PinError {}

/** Base class for errors specific to the GPIODevice hierarchy. */
export class GPIODeviceError extends GPIOError {}

/**
 * Error raised when attempting to use a pin that is already in use by another
 * device.
 */
export class GPIOPinInUse extends GPIODeviceError {}
