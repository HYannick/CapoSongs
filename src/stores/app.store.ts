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

  const cookiesBannerVisible = ref(false);

  const { pushState } = useNavigation();

  const closeCookies = () => {
    cookiesBannerVisible.value = false;
  };
  const openCookies = () => {
    cookiesBannerVisible.value = true;
  };

  const showPlayer = () => {
    playerVisible.value = true;
    pushState({ player: true });
  };
  const showFilters = () => {
    filtersVisible.value = true;
    pushState({ filters: true });
  };
  const showMentions = () => {
    mentionsVisible.value = true;
    hideSettings();
  };

  const showSupport = () => {
    supportVisible.value = true;
    hideSettings();
  };
  const showSettings = () => {
    settingsVisible.value = true;
    pushState({ settings: true });
  };
  const showFavouriteSongs = () => {
    favouriteSongsVisible.value = true;
    pushState({ favourite: true });
  };

  const hideMentions = () => {
    mentionsVisible.value = false;
  };
  const hideSupport = () => {
    supportVisible.value = false;
  };

  const hideFilters = () => {
    filtersVisible.value = false;
    pushState({ filters: false });
  };

  const hidePlayer = () => {
    playerVisible.value = false;
    pushState({ player: false });
  };
  const hideSettings = () => {
    settingsVisible.value = false;
    pushState({ settings: false });
  };
  const hideFavouriteSongs = () => {
    favouriteSongsVisible.value = false;
    pushState({ favourite: false });
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
    showSettings,
    hideSettings,
    toggleSettings,
    favouriteSongsVisible,
    showFavouriteSongs,
    hideFavouriteSongs,
    toggleFavouriteSongs,
    mentionsVisible,
    showMentions,
    hideMentions,
    supportVisible,
    showSupport,
    hideSupport,
    playerVisible,
    showPlayer,
    hidePlayer,
    filtersVisible,
    showFilters,
    hideFilters,
    cookiesBannerVisible,
    openCookies,
    closeCookies
  };
});
