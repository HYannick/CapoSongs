import { historyState } from "@/views/historyState";
import { ref } from "vue";
import type { Ref } from "vue";
import type { HistoryState } from "@/views/historyState";

export const useBackHistory = (window: Window) => {
  // let backPresses = 0;
  // const isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
  // const maxBackPresses = 2;
  // function handleBackButton(init: any, cb?: () => void) {
  //   if (init !== true) backPresses++;
  //   cb && cb();
  //   window.history.pushState('', "");
  // }
  // function setupWindowHistoryTricks(cb: () => void) {
  //   handleBackButton(true);
  //   window.addEventListener("popstate", (init: any) =>
  //     handleBackButton(init, cb)
  //   );
  // }

  const state: Ref<HistoryState> = ref(historyState);

  const initHistoryState = () => {
    window.history.pushState(historyState, "");
    window.onpopstate = (e: any) => {
      alert(history.state.player)
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
    alert('player' + state.value.player);
  };

  return {
    state,
    initHistoryState,
    pushState,
  };
};
