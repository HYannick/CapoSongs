import { useMagicKeys } from "@vueuse/core";

export const useKeyboardControls = () => {
  const keys = useMagicKeys();
  const playerSheet = {
    Space: "space",
    "Ctrl + I": "songDetails",
    "Ctrl + H": "highlightCoro",
    "&#8250;": "incProgress",
    "&#8249;": "decProgress",
    Esc: "close",
  };

  const appSheet = {
    "Ctrl + S": "settings",
    "Ctrl + L": "favourite",
    "Ctrl + D": "theme",
  };
  return {
    playerSheet,
    appSheet,
    app: {
      settings: keys["Ctrl+S"],
      favourites: keys["Ctrl+L"],
      darkMode: keys["Ctrl+D"],
    },
    player: {
      songDetails: keys["Ctrl+I"],
      highlightCoro: keys["Ctrl+H"],
      playPause: " ",
      incProgress: "ArrowRight",
      decProgress: "ArrowLeft",
      closePlayer: "Escape",
    }
  };
};
