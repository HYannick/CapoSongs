<template>
  <button
    class="icon-button"
    :aria-label="ariaLabel"
    :class="[radiusClass, outlinedClass]"
    :disabled="disabled"
  >
    <span class="icon" :class="{'-filled': filled}">
      <Icon :name="iconName" :size="size" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Icon from "@/components/component-library/Icon.vue";

export interface Props {
  label?: string;
  radius?: "rounded" | "circle" | "";
  disabled?: boolean;
  ariaLabel?: string;
  outlined?: boolean;
  iconName: string;
  size?: number;
  filled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  radius: "",
  ariaLabel: "Icon button",
  disabled: false,
  outlined: false,
  filled: false,
  size: 30,
});

const radiusClass = computed(() => props.radius && `-${props.radius}`);
const outlinedClass = computed(() => props.outlined && `-outlined`);
</script>

<style lang="scss">
.icon-button {
  width: 5rem;
  height: 5rem;
  border: transparent;
  background: transparent;
  cursor: pointer;
  transition: transform 0.1s cubic-bezier(0, 0.55, 0.45, 1);
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    path {
      stroke: var(--color-black-950);
      fill: transparent;
      transition: stroke 0.5s cubic-bezier(0, 0.55, 0.45, 1), fill 0.5s
      cubic-bezier(0, 0.55, 0.45, 1);
    }
    &.-filled {
      path {
        stroke: var(--color-system-pink);
        fill: var(--color-system-pink);
      }
    }
  }
  &:active {
    transform: scale(0.9);
  }

  &:disabled,
  &[disabled] {
    box-shadow: 0 0 0 0.3rem var(--color-black-300);
    background-color: var(--color-black-400);

    span {
      color: var(--color-black-700);
    }
  }
}
</style>
