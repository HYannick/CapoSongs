import { computed, ref } from "vue";
import { PushNotificationService } from "@/PushNotificationsService";

export function useNotifications() {
  const permission = ref(Notification.permission);
  const notificationService = new PushNotificationService();
  const isSubscribed = ref(notificationService.isSubscribed());

  const permissionGranted = computed(() => permission.value === "granted");

  const requestPermission = async () => {
    try {
      permission.value = await Notification.requestPermission();
      if (permissionGranted.value) {
        localStorage.setItem("notification-request-triggered", "true");
        await initNotificationService();
      } else {
        localStorage.removeItem("notificationToken");
        isSubscribed.value = false;
      }
      return permissionGranted.value;
    } catch (error) {
      console.error("An error occurred while retrieving token.", error);
      await revokePermission();
      return false;
    }
  };

  const initNotificationService = async () => {
    if (permissionGranted.value) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await notificationService.subscribe({
          vapidKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
          serviceWorkerRegistration: registration,
        });
        isSubscribed.value = true;
      } catch (error) {
        console.error(
          "An error occurred while initializing the notification service.",
          error
        );
      }
    } else {
      console.error("Notification Permission required");
    }
  };

  const revokePermission = async () => {
    await notificationService.unSubscribe();
    isSubscribed.value = false;
  };
  return {
    permissionGranted,
    requestPermission,
    initNotificationService,
    revokePermission,
    isSubscribed,
  };
}
