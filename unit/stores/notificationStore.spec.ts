// stores/counter.spec.ts
import { createPinia, setActivePinia } from "pinia";
import { vi, beforeEach, describe, it, expect } from "vitest";
import { useNotificationStore } from "@/stores/notificationStore";
import type { Notification } from "@/common/domain/Notification";
import { NotificationStatus } from "@/common/domain/NotificationStatus";
import { NotificationMode } from "@/common/domain/NotificationMode";

export const mockNotification = (
  opts?: Partial<Notification>
): Notification => ({
  state: NotificationStatus.SUCCESS,
  text: "Success",
  mode: NotificationMode.EPHEMERAL,
  actions: [],
  icon: "icon-success",
  id: "notif-1984",
  ...opts,
});

vi.mock("uuid", () => ({ v4: () => "notif-uuid-1984" }));

describe("Notification Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should publish notification", () => {
    const notificationStore = useNotificationStore();
    expect(notificationStore.notifications).toEqual([]);
    notificationStore.publish(mockNotification());
    expect(notificationStore.notifications.length).toBe(1);
    notificationStore.publish(mockNotification());
    expect(notificationStore.notifications.length).toBe(2);
  });

  it("should create a notification id if none provided on publish", () => {
    const notificationStore = useNotificationStore();
    expect(notificationStore.notifications).toEqual([]);
    notificationStore.publish(mockNotification({ id: undefined }));
    expect(notificationStore.notifications[0].id).toEqual("notif-uuid-1984");
  });

  it("should remove a notification", () => {
    const notificationStore = useNotificationStore();
    notificationStore.publish(mockNotification({ id: "1984" }));
    notificationStore.publish(mockNotification({ id: "2048" }));
    notificationStore.publish(mockNotification({ id: "2077" }));
    notificationStore.remove("2048");
    expect(notificationStore.notifications.length).toBe(2);
    expect(
      notificationStore.notifications.find(
        (notification) => notification.id === "2048"
      )
    ).toBeUndefined();
  });
});
