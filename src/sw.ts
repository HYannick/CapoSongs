import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { firebaseConfig } from "@/firebaseConfig";

declare let self: ServiceWorkerGlobalScope;

self.addEventListener("message", (event) => {
  console.log("message");
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background Message blup",
    payload
  );
  const notificationTitle = payload.notification?.title;
  const notificationOptions = {
    body: payload.notification?.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
