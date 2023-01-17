import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const settingsVisible = ref(false);
  const mentionsVisible = ref(false);
  const favouriteSongsVisible = ref(false);
  const playerVisible = ref(false);
  const filtersVisible = ref(false);

  const showPlayer = () => {
    playerVisible.value = true;
  };
  const showFilters = () => {
    filtersVisible.value = true;
  };
  const showMentions = () => {
    mentionsVisible.value = true;
    hideSettings();
  };
  const showSettings = () => {
    settingsVisible.value = true;
  };
  const showFavouriteSongs = () => {
    favouriteSongsVisible.value = true;
  };

  const hideMentions = () => {
    mentionsVisible.value = false;
  };

  const hideFilters = () => {
    filtersVisible.value = false;
  };

  const hidePlayer = () => {
    playerVisible.value = false;
  };
  const hideSettings = () => {
    settingsVisible.value = false;
  };
  const hideFavouriteSongs = () => {
    favouriteSongsVisible.value = false;
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
    playerVisible,
    showPlayer,
    hidePlayer,
    filtersVisible,
    showFilters,
    hideFilters,
  };
});
