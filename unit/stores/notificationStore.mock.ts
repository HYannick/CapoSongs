import { createTestingPinia } from "@pinia/testing";
import { vi } from "vitest";
import { useNotificationStore } from "@/stores/notificationStore";
import type { Notification } from "@/common/domain/Notification";

export const initNotificationStore = (notifications: Notification[] = []) => {
  const pinia = createTestingPinia({ createSpy: vi.fn });
  const store = useNotificationStore(pinia);
  store.notifications = notifications;
  return { pinia, store };
};
