<script setup lang="ts">
import HomeView from "@/views/HomeView.vue";
import { useTheme } from "@/composables/useTheme";
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import ReloadPrompt from "@/components/common/ReloadPrompt.vue";
const { setTheme } = useTheme();
const { getSongs } = useSongStore();
const { openCookies } = useAppStore();
const { featuresVisibility } = storeToRefs(useAppStore());
const { locale } = useI18n();

import { useOnline } from "@vueuse/core";
import OfflineScreen from "@/components/common/OfflineScreen.vue";
import { useSongStore } from "@/stores/song.store";
import { useAppStore } from "@/stores/app.store";
import NotificationModal from "@/components/NotificationModal.vue";
import { storeToRefs } from "pinia";
import { useNotifications } from "@/composables/usePushNotifications";
import CookieBanner from "@/components/CookieBanner.vue";
const { isSubscribed, initNotificationService } = useNotifications();
const online = useOnline();
onMounted(async () => {
  setTheme();
  locale.value = localStorage.getItem("lang") || "fr";
  if (!localStorage.getItem("cookies-enabled")) openCookies();
  if (isSubscribed.value) {
    await initNotificationService();
  }
  await getSongs();
});

const displayCookies = computed(
  () =>
    featuresVisibility.value.cookiesBanner &&
    !localStorage.getItem("cookies-enabled")
);

const displayNotifications = computed(
  () =>
    !featuresVisibility.value.cookiesBanner &&
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
