import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const settingsVisible = ref(false);
  const mentionsVisible = ref(false);
  const favouriteSongsVisible = ref(false);
  const playerVisible = ref(false);

  const showPlayer = () => {
    playerVisible.value = true;
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

  const hidePlayer = () => {
    playerVisible.value = false;
  };
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
    mentionsVisible,
    showMentions,
    hideMentions,
  };
});
