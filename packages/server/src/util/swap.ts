//===- util/swap.ts - Swaps keys and values of an object -------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

type PropertyNames<T> = { [K in keyof T]: T[K] }[keyof T];

export function swap(obj: { [k: string]: number }): { [k: number]: string };
export function swap(obj: { [k: number]: string }): { [k: number]: string };
export function swap(obj: { [k: string]: string }): { [k: string]: string };
export function swap(obj: { [k: number]: number }): { [k: number]: number };
export function swap(obj: any) {
  const res = {} as any;

  for (const key in obj) {
    res[obj[key]] = key;
  }

  return res;
}
