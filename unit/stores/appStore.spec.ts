import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, it, expect, vi } from "vitest";
import { useAppStore } from "@/stores/app.store";

const useNavigationMock = {
  pushState: vi.fn(),
};
vi.mock("@/stores/navigation.store", () => ({
  useNavigation: () => useNavigationMock,
}));
describe("App Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.resetAllMocks();
  });

  it("should show/hide settings", () => {
    const appStore = useAppStore();
    expect(appStore.settingsVisible).toBeFalsy();
    appStore.showSettings();
    expect(appStore.settingsVisible).toBeTruthy();
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({ settings: true })
    appStore.hideSettings();
    expect(appStore.settingsVisible).toBeFalsy();
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({ settings: false })
  });

  it("should show/hide favourite songs", () => {
    const appStore = useAppStore();
    expect(appStore.favouriteSongsVisible).toBeFalsy();
    appStore.showFavouriteSongs();
    expect(appStore.favouriteSongsVisible).toBeTruthy();
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({ favourite: true })
    appStore.hideFavouriteSongs();
    expect(appStore.favouriteSongsVisible).toBeFalsy();
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({ favourite: false })
  });

  it("should show/hide player", () => {
    const appStore = useAppStore();
    expect(appStore.playerVisible).toBeFalsy();
    appStore.showPlayer();
    expect(appStore.playerVisible).toBeTruthy();
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({ player: true })
    appStore.hidePlayer();
    expect(appStore.playerVisible).toBeFalsy();
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({ player: false })
  });

  it("should show/hide mentions", () => {
    const appStore = useAppStore();
    expect(appStore.mentionsVisible).toBeFalsy();
    appStore.showMentions();
    expect(appStore.mentionsVisible).toBeTruthy();
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({ settings: false })
    appStore.hideMentions();
    expect(appStore.mentionsVisible).toBeFalsy();
  });

  it("should toggle settings", () => {
    const appStore = useAppStore();
    expect(appStore.settingsVisible).toBeFalsy();
    appStore.toggleSettings();
    expect(appStore.settingsVisible).toBeTruthy();
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({ settings: true })
    appStore.toggleSettings();
    expect(appStore.settingsVisible).toBeFalsy();
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({ settings: false })
  });

  it("should show/hide favourite songs", () => {
    const appStore = useAppStore();
    expect(appStore.favouriteSongsVisible).toBeFalsy();
    appStore.toggleFavouriteSongs();
    expect(appStore.favouriteSongsVisible).toBeTruthy();
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({ favourite: true })
    appStore.toggleFavouriteSongs();
    expect(appStore.favouriteSongsVisible).toBeFalsy();
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({ favourite: false })
  });

  it("should show/hide filters", () => {
    const appStore = useAppStore();
    expect(appStore.filtersVisible).toBeFalsy();
    appStore.showFilters();
    expect(appStore.filtersVisible).toBeTruthy();
    appStore.hideFilters();
    expect(appStore.filtersVisible).toBeFalsy();
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({
      filters: false,
    });
  });

  it("should show/hide share app modal", () => {
    const appStore = useAppStore();
    expect(appStore.shareAppVisible).toBeFalsy();
    appStore.showShareApp();
    expect(appStore.shareAppVisible).toBeTruthy();
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({
      settings: false,
    });
    appStore.hideShareApp();
    expect(appStore.shareAppVisible).toBeFalsy();
  });

  it("should show/hide support modal", () => {
    const appStore = useAppStore();
    expect(appStore.supportVisible).toBeFalsy();
    appStore.showSupport();
    expect(appStore.supportVisible).toBeTruthy();
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({
      settings: false,
    });
    appStore.hideSupport();
    expect(appStore.supportVisible).toBeFalsy();
  });

  it("should show/hide cookies modal", () => {
    const appStore = useAppStore();
    expect(appStore.cookiesBannerVisible).toBeFalsy();
    appStore.openCookies();
    expect(appStore.cookiesBannerVisible).toBeTruthy();
    appStore.closeCookies();
    expect(appStore.cookiesBannerVisible).toBeFalsy();
  });
});
