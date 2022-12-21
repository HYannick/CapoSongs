import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const settingsVisible = ref(false);
  const favouriteSongsVisible = ref(false);
  const playerVisible = ref(false);

  const showPlayer = () => {
    playerVisible.value = true;
  }
  const showSettings = () => {
    settingsVisible.value = true;
  };
  const showFavouriteSongs = () => {
    favouriteSongsVisible.value = true;
  };

  const hidePlayer = () => {
    playerVisible.value = false;
  }
  const hideSettings = () => {
    settingsVisible.value = false;
  };
  const hideFavouriteSongs = () => {
    favouriteSongsVisible.value = false;
  };

  return {
    settingsVisible,
    favouriteSongsVisible,
    showSettings,
    showFavouriteSongs,
    hideSettings,
    hideFavouriteSongs,
    playerVisible,
    showPlayer,
    hidePlayer,
  };
});
