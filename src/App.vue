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
});
</script>

<template>
  <HomeView />
</template>
