import { ref } from "vue";
import { defineStore } from "pinia";

export const usePWAInstallation = defineStore("pwa", () => {
  const deferredPrompt = ref();
  const appInstalled = ref(true);
  const appInstallationDismissed = ref(false);
  const initInstall = () => {
    window.addEventListener("beforeinstallprompt", (e) => {
      deferredPrompt.value = e;
      appInstalled.value = false;
    });
    window.addEventListener("appinstalled", () => {
      appInstalled.value = true;
    });
  };

  const detectSWUpdate = async () => {
    const registration = await navigator.serviceWorker.ready;

    registration.addEventListener("updatefound", () => {
      alert('updateFound')
      const newSW = registration.installing!;
      newSW.addEventListener("statechange", () => {
        console.log('???')
        if (newSW.state == "installed") {
          // New service worker is installed, but waiting activation
        }
      });
    })
  }

  const closeInstallPrompt = () => {
    appInstallationDismissed.value = true;
  };

  const isAppleDevice = () => {
    const appleExpression = /Apple/i;
    const safariExpression = /Safari/i;
    return (
      appleExpression.test(navigator.vendor) &&
      safariExpression.test(navigator.userAgent)
    );
  };

  const installApp = async (appleDeviceMessage: string) => {
    if (isAppleDevice()) {
      alert(appleDeviceMessage);
      return;
    }

    if (!deferredPrompt.value) {
      appInstallationDismissed.value = true;
      return;
    }

    deferredPrompt.value.prompt();

    const { outcome } = await deferredPrompt.value.userChoice;

    appInstalled.value = outcome !== "dismissed";

    deferredPrompt.value = null;
  };

  return {
    appInstalled,
    appInstallationDismissed,
    initInstall,
    installApp,
    closeInstallPrompt,
    isAppleDevice,
    detectSWUpdate,
  };
});
