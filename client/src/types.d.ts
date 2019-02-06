//===- types.d.ts - Miscellaneous Type Defs --------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

declare module "*.html" {
  const content: string;
  export default content;
}

interface InjectableCSS {
  __inject__?(ctx?: any): void;
}

declare module "*.scss" {
  const css: InjectableCSS;
  export default css;
}
