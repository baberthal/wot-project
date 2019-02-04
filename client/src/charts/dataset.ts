//===- charts/dataset.ts - Dataset Interface -------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export interface Dataset {
  metric?: string[];
  dim: string | null;
  data: object[];
}
