<script setup lang="ts">
import HomeView from "@/views/HomeView.vue";
import { useTheme } from "@/composables/useTheme";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import ReloadPrompt from "@/components/common/ReloadPrompt.vue";
const { setTheme } = useTheme();
const { locale } = useI18n();

onMounted(async () => {
  setTheme();
  locale.value = localStorage.getItem("lang") || "fr";
  try {
    const keys = await window.caches.keys();
    alert(keys);
    await Promise.all(keys.map(key => caches.delete(key)));
    alert('deleted')
  } catch (err) {
    alert('error on delete')
    console.log('deleteCache err: ', err);
  }
});
</script>

<template>
  <ReloadPrompt />
  <HomeView />
</template>
