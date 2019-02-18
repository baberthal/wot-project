//===- search-box.component - Search Box Component -------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Component, Vue } from "@app/core";

import "./search-box.styles.scss";
import template from "./search-box.template.html";

@Component({
  template
})
export class SearchBox extends Vue {
  performSearch() {}
}

export default SearchBox;
