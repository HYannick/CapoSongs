<template>
  <div class="skeleton" v-if="!loaded"></div>
  <img
    class="thumbnail"
    ref="thumbnailRef"
    :class="{ '-loaded': loaded }"
    :src="src"
    :alt="alt"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import imagesLoaded from "imagesloaded";

defineProps({
  src: String,
  alt: String,
});

const thumbnailRef = ref();
const loaded = ref(false);
onMounted(() => {
  imagesLoaded(thumbnailRef.value, () => {
    loaded.value = true;
  });
});
</script>

<style lang="scss">
.skeleton {
  width: 100%;
  height: 100%;
  background: linear-gradient(-45deg, var(--color-primary-100),
    var(--color-primary-400),
    var(--color-primary-600), var(--color-primary-800));
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}
.thumbnail {
  opacity: 0;
  transform: scale(1.3);
  transition: transform 0.5s cubic-bezier(0.83, 0, 0.17, 1),
    opacity 0.5s cubic-bezier(0.83, 0, 0.17, 1);
  &.-loaded {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

</style>
