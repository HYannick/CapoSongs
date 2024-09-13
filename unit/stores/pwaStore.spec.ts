import { createPinia, setActivePinia } from "pinia";
import { beforeEach, vi, describe, it, expect } from "vitest";
import { usePWAInstallation } from "@/stores/pwa.store";

const mockAppleDeviceDetection = (isAppleDevice: boolean = false) => {
  const vendor = vi.spyOn(navigator, "vendor", "get");
  const userAgent = vi.spyOn(navigator, "userAgent", "get");
  vendor.mockImplementation(() => (isAppleDevice ? "Apple" : "Android"));
  userAgent.mockImplementation(() => "Safari");
};

const mockDeferredPrompt = (outcome: string = "validate") => ({
  userChoice: vi.fn().mockResolvedValue({
    outcome,
  }),
  prompt: vi.fn(),
});
// @vitest-environment jsdom
describe("PWA Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should alert user with custom message if Apple device while install", () => {
    window.alert = vi.fn();
    const pwaStore = usePWAInstallation();
    mockAppleDeviceDetection(true);
    pwaStore.installApp("Nop");
    expect(window.alert).toHaveBeenCalledWith("Nop");
  });

  it("should not install app if user prevent it", () => {
    window.alert = vi.fn();
    const pwaStore = usePWAInstallation();
    mockAppleDeviceDetection();
    pwaStore.deferredPrompt = mockDeferredPrompt();
    pwaStore.installApp("Nop");
    expect(window.alert).not.toHaveBeenCalledWith("Nop");
  });

  it("should close installation prompt", () => {
    const pwaStore = usePWAInstallation();
    expect(pwaStore.appInstallationDismissed).toBeFalsy();
    pwaStore.closeInstallPrompt();
    expect(pwaStore.appInstallationDismissed).toBeTruthy();
  });
});
