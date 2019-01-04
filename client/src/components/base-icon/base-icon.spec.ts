//===- components/base/base-icon/base-icon.spec.ts - Base Icon Spec --------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { shallowMount } from "@vue/test-utils";
import { BaseIcon } from "./base-icon.component";

describe("BaseIcon", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(BaseIcon);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("is a vue instance", () => {
    const wrapper = shallowMount(BaseIcon);

    expect(wrapper.name()).toBe("BaseIcon");
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("render icon when icon property is passed", () => {
    const wrapper = shallowMount(BaseIcon, {
      propsData: { icon: "eye" }
    });

    expect(wrapper.classes()).toContain("icon");
    expect(wrapper.find("i").classes()).toEqual(
      expect.arrayContaining(["mdi", "mdi-eye", "mdi-24px"])
    );
  });

  it("render a colored icon when type is passed", () => {
    const wrapper = shallowMount(BaseIcon, {
      propsData: {
        icon: "eye",
        type: "is-primary"
      }
    });

    expect(wrapper.classes()).toContain("has-text-primary");
  });

  it("display size when size propery is passed", () => {
    const wrapper = shallowMount(BaseIcon, {
      propsData: {
        icon: "eye"
      }
    });

    expect(wrapper.find("i").classes()).toContain("mdi-24px");
    wrapper.setProps({ size: "is-small" });
    expect(wrapper.find("i").classes()).toEqual(
      expect.arrayContaining(["mdi", "mdi-eye"])
    );
    wrapper.setProps({ size: "is-medium" });
    expect(wrapper.find("i").classes()).toContain("mdi-36px");
    wrapper.setProps({ size: "is-large" });
    expect(wrapper.find("i").classes()).toContain("mdi-48px");
  });

  it("render custom classes when customClass property is passed", () => {
    const wrapper = shallowMount(BaseIcon, {
      propsData: {
        icon: "eye",
        customClass: "foo-bar"
      }
    });

    expect(wrapper.find("i").classes()).toContain("foo-bar");
  });
});
