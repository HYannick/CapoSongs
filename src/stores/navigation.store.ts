import { ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";
import type { HistoryState } from "@/common/types/HistoryState";

const defaultHistoryState: HistoryState = {
  player: false,
  home: true,
  settings: false,
  favourite: false,
  filters: false,
  details: false,
}

export const useNavigation = defineStore("navigation", () => {
  const state: Ref<HistoryState> = ref(defaultHistoryState);

  const initHistoryState = () => {
    window.history.pushState(defaultHistoryState, "");
    window.onpopstate = () => {
      state.value = {
        ...defaultHistoryState,
        ...history.state,
      };
    };
  };

  const pushState = (newState: Partial<HistoryState>) => {
    window.history.pushState({ ...state.value, ...newState }, "");
    state.value = {
      ...defaultHistoryState,
      ...history.state,
    };
  };

  return {
    state,
    initHistoryState,
    pushState,
  };
});
