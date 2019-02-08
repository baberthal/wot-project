//===- index.ts - Main file ------------------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import * as yargs from "yargs";

const argv = yargs
  .command("generate <component-name>", "generate a Vue component", {})
  .help().argv;

console.log(argv);
