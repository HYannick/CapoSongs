import { ref } from "vue";
import { defineStore } from "pinia";
import { useNavigation } from "@/stores/navigation.store";

export const useAppStore = defineStore("app", () => {
  const settingsVisible = ref(false);
  const supportVisible = ref(false);
  const mentionsVisible = ref(false);
  const favouriteSongsVisible = ref(false);
  const playerVisible = ref(false);
  const filtersVisible = ref(false);
  const shareAppVisible = ref(false);
  const cookiesBannerVisible = ref(false);

  const { pushState } = useNavigation();

  const closeCookies = () => {
    cookiesBannerVisible.value = false;
  };
  const openCookies = () => {
    cookiesBannerVisible.value = true;
  };

  const showShareApp = () => {
    shareAppVisible.value = true;
    hideSettings();
  };
  const hideShareApp = () => {
    shareAppVisible.value = false;
  };

  const showPlayer = () => {
    playerVisible.value = true;
    pushState({ player: true });
  };
  const hidePlayer = () => {
    playerVisible.value = false;
    pushState({ player: false });
  };

  const showFilters = () => {
    filtersVisible.value = true;
    pushState({ filters: true });
  };
  const hideFilters = () => {
    filtersVisible.value = false;
    pushState({ filters: false });
  };

  const showMentions = () => {
    mentionsVisible.value = true;
    hideSettings();
  };
  const hideMentions = () => {
    mentionsVisible.value = false;
  };

  const showSettings = () => {
    settingsVisible.value = true;
    pushState({ settings: true });
  };
  const hideSettings = () => {
    settingsVisible.value = false;
    pushState({ settings: false });
  };

  const showFavouriteSongs = () => {
    favouriteSongsVisible.value = true;
    pushState({ favourite: true });
  };
  const hideFavouriteSongs = () => {
    favouriteSongsVisible.value = false;
    pushState({ favourite: false });
  };

  const showSupport = () => {
    supportVisible.value = true;
    hideSettings();
  };
  const hideSupport = () => {
    supportVisible.value = false;
  };

  const toggleSettings = () => {
    if (!settingsVisible.value) {
      showSettings();
    } else {
      hideSettings();
    }
  };
  const toggleFavouriteSongs = () => {
    if (!favouriteSongsVisible.value) {
      showFavouriteSongs();
    } else {
      hideFavouriteSongs();
    }
  };

  return {
    settingsVisible,
    favouriteSongsVisible,
    mentionsVisible,
    supportVisible,
    playerVisible,
    filtersVisible,
    cookiesBannerVisible,
    shareAppVisible,
    showSettings,
    hideSettings,
    toggleSettings,
    showFavouriteSongs,
    hideFavouriteSongs,
    toggleFavouriteSongs,
    showMentions,
    hideMentions,
    showSupport,
    hideSupport,
    showPlayer,
    hidePlayer,
    showFilters,
    hideFilters,
    openCookies,
    closeCookies,
    showShareApp,
    hideShareApp,
  };
});
