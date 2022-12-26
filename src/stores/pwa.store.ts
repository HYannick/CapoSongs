import { ref } from "vue";
import { defineStore } from "pinia";

export const usePWAInstallation = defineStore("pwa", () => {
  const deferredPrompt = ref();
  const appInstalled = ref(false);
  const appInstallationDismissed = ref(false);
  const initInstall = () => {
    if (isAppleDevice) return;
    window.addEventListener("beforeinstallprompt", (e) => {
      // Stash the event so it can be triggered later.
      alert('Install')
      deferredPrompt.value = e;
      alert(deferredPrompt.value)
      // Update UI notify the user they can install the PWA
    });
    window.addEventListener("appinstalled", () => {
      alert("???");
      // Hide the app-provided install promotion
      // Clear the deferredPrompt so it can be garbage collected
      appInstalled.value = true;
      alert(appInstalled.value);
      // Optionally, send analytics event to indicate successful install
      console.log("PWA was installed");
    });
  };

  const closeInstallPrompt = () => {
    appInstallationDismissed.value = true;
  };

  const isAppleDevice = [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod",
  ].includes(navigator.userAgent);

  const installApp = async (appleDeviceMessage: string) => {
    if (isAppleDevice) {
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
  };
});
