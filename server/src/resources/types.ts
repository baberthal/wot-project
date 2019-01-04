//===- resources/types.ts - Resource Model Types ---------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export interface Named {
  name: string;
}

export interface Described extends Named {
  description: string;
}

export interface Taggable {
  tags: string[];
}

export interface GPIOConnected {
  /** The GPIO connector number */
  gpio: number;
}

export interface Sensor<T> extends Described, GPIOConnected {
  unit?: string;
  value: T;
}

export interface Actuator<T> extends Named, GPIOConnected {
  value: T;
}

export interface ActuatorGroup<T> {
  [key: string]: Actuator<T>;
}

export interface Device<SensorT = any, ActuatorT = any> {
  name: string;
  description: string;
  port: number;
  sensors: {
    [key: string]: Sensor<SensorT>;
  };
  actuators: {
    [key: string]: ActuatorGroup<ActuatorT>;
  };
}

export interface SensorValues extends Described {
  unit: string;
  customFields: CustomFields;
}

export interface BaseLink {
  link: string;
  title: string;
}

export interface ResourcesLink extends Described, Taggable {
  values: {
    [key: string]: SensorValues;
  };
}

export interface PropertiesLinks extends BaseLink {
  resources: { [key: string]: ResourcesLink };
}

export interface CustomFields {
  [key: string]: any;
}

export interface Pi {
  id: string;
  name: string;
  description: string;
  tags: string[];
  customFields: CustomFields;
  links: {
    product: BaseLink;

    properties: {
      link: string;
      title: string;
      resources: { [key: string]: ResourcesLink };
    };
  };
}
