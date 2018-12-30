//===- models/mixins/taggable.ts - Mixin for 'taggable' types --------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export class Taggable {
  constructor() {
    /* tslint:disable-next-line:no-console */
    console.log("Taggable#constructor");
  }

  private readonly _tags: Set<string> = new Set();

  get tags(): string[] {
    return Array.from(this._tags);
  }

  public addTag(tag: string): void {
    this._tags.add(tag);
  }

  public hasTag(tag: string): boolean {
    return this._tags.has(tag);
  }

  public removeTag(tag: string): boolean {
    return this._tags.delete(tag);
  }
}
