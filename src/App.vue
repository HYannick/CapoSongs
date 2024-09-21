<script setup lang="ts">
import HomeView from "@/views/HomeView.vue";
import { useTheme } from "@/composables/useTheme";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import ReloadPrompt from "@/components/common/ReloadPrompt.vue";
const { setTheme } = useTheme();
const { openCookies, openNotificationsModal } = useAppStore();
const { featuresVisibility } = storeToRefs(useAppStore());
const { locale } = useI18n();

import { useOnline } from "@vueuse/core";
import OfflineScreen from "@/components/common/OfflineScreen.vue";
import { useAppStore } from "@/stores/app.store";
import NotificationModal from "@/components/NotificationModal.vue";
import { storeToRefs } from "pinia";
import { usePushNotifications } from "@/composables/usePushNotifications";
import CookieBanner from "@/components/CookieBanner.vue";
import Notifications from "@/components/common/Notifications.vue";

const online = useOnline();
const { isSubscribed, initNotificationService } = usePushNotifications();

const shouldDisplayCookies = !localStorage.getItem("cookies-enabled");
const shouldDisplayNotifications =
  !localStorage.getItem("notification-request-triggered") &&
  localStorage.getItem("cookies-enabled");

const setLocale = () => {
  locale.value = localStorage.getItem("lang") || "en";
};

onMounted(async () => {
  setTheme();
  setLocale();
  if (shouldDisplayCookies) openCookies();
  if (shouldDisplayNotifications) openNotificationsModal();
  if (isSubscribed.value) await initNotificationService();
});

const displayCookies = computed(
  () =>
    featuresVisibility.value.cookiesBanner &&
    !localStorage.getItem("cookies-enabled")
);

const displayNotifications = computed(
  () =>
    featuresVisibility.value.notificationsModal &&
    !localStorage.getItem("notification-request-triggered")
);

const displayNotificationModal = () => {
  featuresVisibility.value.notificationsModal = !localStorage.getItem(
    "notification-request-triggered"
  );
};
</script>

<template>
  <ReloadPrompt />
  <CookieBanner v-if="displayCookies" @close="displayNotificationModal" />
  <NotificationModal v-if="displayNotifications" />
  <HomeView v-if="online" />
  <OfflineScreen v-else />
  <Notifications />
</template>

<style lang="scss">
.offline-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  svg {
    path {
      fill: var(--color-black-200);
    }
  }
  .offline-text {
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    p {
      text-align: center;
    }
  }
  .offline-retry-button {
    margin-top: 4rem;
    cursor: pointer;
    height: 5rem;
    max-width: 25rem;
    width: 100%;
    border: none;
    border-radius: 5rem;
    background: var(--color-black-900);
    color: var(--color-black-50);
    transition: transform 0.3s cubic-bezier(0, 0.55, 0.45, 1);
    transform: scale(1);
    &:active {
      transform: scale(0.9);
    }
  }
}
</style>
