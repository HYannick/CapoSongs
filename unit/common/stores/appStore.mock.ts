import { createTestingPinia } from "@pinia/testing";
import { vi } from "vitest";
import { useAppStore } from "src/stores/app.store";

export const initAppStore = () => {
  const pinia = createTestingPinia({ createSpy: vi.fn });
  const store = useAppStore(pinia);
  return { pinia, store };
};
