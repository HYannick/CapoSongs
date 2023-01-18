import { historyState } from "@/views/historyState";
import { ref } from "vue";
import type { Ref } from "vue";
import type { HistoryState } from "@/views/historyState";
import { defineStore } from "pinia";

export const useNavigation = defineStore("navigation", () => {
  const state: Ref<HistoryState> = ref(historyState);

  const initHistoryState = () => {
    window.history.pushState(historyState, "");
    window.onpopstate = (e: any) => {
      state.value = {
        ...historyState,
        ...history.state,
      };
    };
  };

  const pushState = (newState: Partial<HistoryState>) => {
    window.history.pushState({ ...state.value, ...newState }, "");
    state.value = {
      ...historyState,
      ...history.state,
    };
  };

  return {
    state,
    initHistoryState,
    pushState,
  };
});
