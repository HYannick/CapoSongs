<template>
  <component
    :is="icon"
    class="icon-wrapper"
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
}

const props = withDefaults(defineProps<Props>(), {
  size: 16,
});

const icon = defineAsyncComponent(
  () => import(`../../assets/svg/${props.name}.svg`)
);
</script>
