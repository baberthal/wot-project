//===- core/index.ts - Export Bucket ---------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export * from "./core";
export * from "./decorators";
export * from "./dev-mode";
export { fetchJson } from "./fetch-json";
export * from "./store_decorators";

import { Vue } from "./core";
export default Vue;
