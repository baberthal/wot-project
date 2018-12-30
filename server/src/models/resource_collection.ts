//===- resources/v1/resource_collection.ts - A collection of resources -----===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Base } from "./base";

export class ResourceCollection<T extends Base> {
  private _resources: Map<string, T>;

  constructor(resources: Map<string, T>) {
    this._resources = resources;
  }

  find(id: string): Promise<T> {
    return new Promise((resolve, reject) => {
      const resource = this._resources.get(id);

      if (!resource) {
        const err = new Error(`Unable to find resource with id: '${id}'`);
        reject(err);
      }

      resolve(resource);
    });
  }

  add(id: string, resource: T) {
    this._resources.set(id, resource);
  }
}
