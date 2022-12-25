import { describe, it, expect } from "vitest";

import { shallowMount } from "@vue/test-utils";
import Heading from "@/components/common/Heading.vue";

// @vitest-environment jsdom
describe("Heading", () => {
  it("should emit event to open favourite songs sidebar", () => {
    const wrapper = shallowMount(Heading);
    const component = wrapper.vm;
    component.showFavouriteSongs();
    expect(wrapper.emitted("show-favourite-songs")).toBeTruthy();
  });

  it("should emit event to open settings sidebar", () => {
    const wrapper = shallowMount(Heading);
    const component = wrapper.vm;
    component.showSettings();
    expect(wrapper.emitted("show-settings")).toBeTruthy();
  });
});
