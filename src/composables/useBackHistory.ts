export const useBackHistory = () => {
  let backPresses = 0;
  const isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
  const maxBackPresses = 2;
  function handleBackButton(init: any, cb?: () => void) {
    if (init !== true) backPresses++;
    cb && cb();
    window.history.pushState({}, "");
  }
  function setupWindowHistoryTricks(cb: () => void) {
    handleBackButton(true);
    window.addEventListener("popstate", (init: any) =>
      handleBackButton(init, cb)
    );
  }

  return {
    setupWindowHistoryTricks,
  };
};
