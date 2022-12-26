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
      deferredPrompt.value = e;
      // Update UI notify the user they can install the PWA
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);
    });
    window.addEventListener("appinstalled", () => {
      // Hide the app-provided install promotion
      // Clear the deferredPrompt so it can be garbage collected
      appInstalled.value = true;
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

  const installApp = async () => {
    if (isAppleDevice) {
      alert(
        "Pour iOS, va dans l’option de Partage et Ajouter à l’écran" +
          " d’accueil"
      );
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
