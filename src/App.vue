<script setup lang="ts">
import HomeView from "@/views/HomeView.vue";
import { useTheme } from "@/composables/useTheme";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
const { setTheme } = useTheme();
const { locale } = useI18n();
onMounted(() => {
  setTheme();
  locale.value = localStorage.getItem("lang") || "fr";
  async function detectSWUpdate() {
    const registration = await navigator.serviceWorker.ready;

    registration.addEventListener("updatefound", event => {
      alert('updateFound')
      const newSW = registration.installing!;
      alert(newSW);
      newSW.addEventListener("statechange", event => {
        if (newSW.state == "installed") {
          // New service worker is installed, but waiting activation
          alert('everything is installed')
        }
      });
    })
  }
  detectSWUpdate();
});
</script>

<template>
  <HomeView />
</template>
