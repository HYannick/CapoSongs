// stores/counter.spec.ts
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, it, expect } from "vitest";
import { useAppStore } from "src/stores/app.store";

describe("App Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should show/hide settings", () => {
    const appStore = useAppStore();
    expect(appStore.settingsVisible).toBeFalsy();
    appStore.showSettings();
    expect(appStore.settingsVisible).toBeTruthy();
    appStore.hideSettings();
    expect(appStore.settingsVisible).toBeFalsy();
  });

  it("should show/hide favourite songs", () => {
    const appStore = useAppStore();
    expect(appStore.favouriteSongsVisible).toBeFalsy();
    appStore.showFavouriteSongs();
    expect(appStore.favouriteSongsVisible).toBeTruthy();
    appStore.hideFavouriteSongs();
    expect(appStore.favouriteSongsVisible).toBeFalsy();
  });
});
