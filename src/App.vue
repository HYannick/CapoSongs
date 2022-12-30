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
});
</script>

<template>
  <ReloadPrompt />
  <HomeView />
</template>
