<script setup lang="ts">
import HomeView from "@/views/HomeView.vue";
import { useTheme } from "@/composables/useTheme";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import ReloadPrompt from "@/components/common/ReloadPrompt.vue";
const { setTheme } = useTheme();
const { locale } = useI18n();

import { useOnline } from "@vueuse/core";
import Icon from "@/components/component-library/Icon.vue";

const online = useOnline();
const reloadPage = () => {
  window.location.reload();
};
onMounted(async () => {
  setTheme();
  locale.value = localStorage.getItem("lang") || "fr";
});
</script>

<template>
  <ReloadPrompt />
  <HomeView v-if="online" />
  <div class="offline-screen" v-else>
    <Icon name="offline" size="250" />
    <div class="offline-text">
      <p class="text -bold -large-body">No internet connection found</p>
      <p class="text">
        It seems there is a problem with your connection.<br />
        Please check your network
      </p>
      <button class="offline-retry-button" @click="reloadPage">
        <span class="text -bold -body">Try again</span>
      </button>
    </div>
  </div>
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
