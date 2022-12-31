// stores/counter.spec.ts
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, it, expect } from "vitest";
import { useAppStore } from "@/stores/app.store";

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

  it("should show/hide player", () => {
    const appStore = useAppStore();
    expect(appStore.playerVisible).toBeFalsy();
    appStore.showPlayer();
    expect(appStore.playerVisible).toBeTruthy();
    appStore.hidePlayer();
    expect(appStore.playerVisible).toBeFalsy();
  });

  it("should show/hide mentions", () => {
    const appStore = useAppStore();
    expect(appStore.mentionsVisible).toBeFalsy();
    appStore.showMentions();
    expect(appStore.mentionsVisible).toBeTruthy();
    appStore.hideMentions();
    expect(appStore.mentionsVisible).toBeFalsy();
  });

  it("should toggle settings", () => {
    const appStore = useAppStore();
    expect(appStore.settingsVisible).toBeFalsy();
    appStore.toggleSettings();
    expect(appStore.settingsVisible).toBeTruthy();
    appStore.toggleSettings();
    expect(appStore.settingsVisible).toBeFalsy();
  });

  it("should show/hide favourite songs", () => {
    const appStore = useAppStore();
    expect(appStore.favouriteSongsVisible).toBeFalsy();
    appStore.toggleFavouriteSongs();
    expect(appStore.favouriteSongsVisible).toBeTruthy();
    appStore.toggleFavouriteSongs();
    expect(appStore.favouriteSongsVisible).toBeFalsy();
  });

});
