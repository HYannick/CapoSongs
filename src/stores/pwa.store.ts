import { ref } from "vue";
import { defineStore } from "pinia";

export const usePWAInstallation = defineStore("pwa", () => {
  const deferredPrompt = ref();
  const appInstalled = ref(true);
  const appInstallationDismissed = ref(false);
  const initInstall = () => {
    if (isAppleDevice.value) return;
    window.addEventListener("beforeinstallprompt", (e) => {
      deferredPrompt.value = e;
      appInstalled.value = false;
    });
    window.addEventListener("appinstalled", () => {
      appInstalled.value = true;
    });
  };

  const closeInstallPrompt = () => {
    appInstallationDismissed.value = true;
  };

  const isAppleDevice = ref(/iPad|iPhone|iPod/.test(navigator.userAgent));

  const installApp = async (appleDeviceMessage: string) => {
    if (isAppleDevice.value) {
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
  };
});
