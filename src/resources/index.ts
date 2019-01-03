//===- resources/index.ts - Resources --------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as V1 from "./v1";
import * as V2 from "./v2";

import * as resources from "./resources.json";

export const v1Resources: V1.WebThingCollection = resources;

export default v1Resources;
