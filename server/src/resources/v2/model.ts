//===- resources/v2/model.ts - V2 Model Class ------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export interface ModelInit {
  id: string;
  name: string;
  description: string;
  tags?: string[];
  customFields?: object;
}

export class Model {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  public tags: string[];
  readonly customFields: object;

  constructor(init: ModelInit) {
    this.id = init.id;
    this.name = init.name;
    this.description = init.description;
    this.tags = init.tags || [];
    this.customFields = init.customFields || {};
  }
}
