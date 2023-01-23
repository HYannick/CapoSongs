import { describe, it, expect, vi, beforeEach } from "vitest";

import { shallowMount } from "@vue/test-utils";
import Heading from "../../src/components/common/Heading.vue";

const mockedAppStore = {
  showSettings: vi.fn(),
  showFavouriteSongs: vi.fn(),
};
vi.mock("@/stores/app.store", () => mockedAppStore);
vi.mock("vue-i18n", () => ({
  useI18n: () => ({
    t: vi.fn(),
  }),
}));

// @vitest-environment jsdom
describe("Heading", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  it("should emit event to open favourite songs sidebar", () => {
    const wrapper = shallowMount(Heading);
    const component = wrapper.vm;
    component.showFavouriteSongs();
    expect(mockedAppStore.showFavouriteSongs).toHaveBeenCalled();
  });

  it("should emit event to open settings sidebar", () => {
    const wrapper = shallowMount(Heading);
    const component = wrapper.vm;
    component.showSettings();
    expect(mockedAppStore.showSettings).toHaveBeenCalled();
  });
});
