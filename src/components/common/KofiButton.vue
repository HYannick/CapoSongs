<template>
  <a
    class="kofi-button"
    :href="kofiUrl"
    target="_blank"
    title="Support me on ko-fi.com"
  >
    <Icon name="kofi-cup" :size="20" />
    {{ t("sidebars.settings.kofiLabel") }}
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Icon from "@/components/component-library/Icon.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const kofiUrl = computed(() => `https://ko-fi.com/ayaho`);
</script>

<style lang="scss" scoped>
.kofi-button {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  min-width: 20rem;
  gap: 1rem;
  background: var(--color-black-900);
  color: var(--color-black-50);
  text-align: center;
  border-radius: 3rem;
  cursor: pointer;
  font-weight: 400;
  font-size: 1.4rem;

  &:hover {
    opacity: 0.85;
  }

  &:active {
    color: var(--color-black-10);
  }
}
</style>
