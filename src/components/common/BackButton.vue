<template>
  <button class="button-return" aria-label="go to previous screen">
    <Icon name="chevron-left" />
    <span class="button-return-label text -bold">
      {{ label || t("common.backButton") }}
    </span>
  </button>
</template>
<script setup lang="ts">
import Icon from "@/components/component-library/Icon.vue";
import { useI18n } from "vue-i18n";
defineProps({
  label: String
})
const { t } = useI18n();
</script>

<style lang="scss">
.button-return {
  position: absolute;
  top: 0.5rem;
  left: 1rem;
  display: flex;
  z-index: 9;
  align-items: center;
  justify-content: center;
  color: var(--color-black-950);
  background: transparent;
  border: transparent;
  cursor: pointer;

  path {
    stroke: var(--color-black-950);
  }

  &-label {
    margin-left: 0.4rem;

    &:after {
      content: "";
      width: 0.4rem;
      height: 0.4rem;
      background: var(--color-primary-600);
      position: absolute;
      border-radius: 1rem;
      bottom: -0.5rem;
      left: 0.3rem;
    }
  }
}
</style>