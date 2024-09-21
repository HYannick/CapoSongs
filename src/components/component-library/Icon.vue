<template>
  <component
    :is="icon"
    :width="props.size"
    :height="props.size"
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

export interface Props {
  name: string;
  filled?: boolean;
  size?: number;
  defaultColor?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 16,
  defaultColor: false,
});

const icon = defineAsyncComponent(
  () => import(`../../assets/svg/${props.name}.svg`)
);
</script>

<style>
.default-color path {
  stroke: var(--color-black-950);
}
</style>
