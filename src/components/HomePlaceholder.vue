<template>
  <div class="song-placeholder">
    <div
      ref="imageRef"
      class="song-placeholder-img song-placeholder-img-fighters"
    >
      <Icon name="fighters" size="600" />
    </div>
    <div ref="contentRef" class="song-placeholder-content">
      <h2 class="text -bold -title-4 color-black--500">Ready to sing ?</h2>
      <p class="text -regular -large-body color-black--400">
        Select a song on the left and start!
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Icon from "@/components/component-library/Icon.vue";
import { onMounted, ref } from "vue";
import gsap from "gsap";

const imageRef = ref();
const contentRef = ref();

onMounted(() => {
  gsap.to(imageRef.value, {
    opacity: 0.1,
    duration: 0.7,
    delay: 0.5,
  });
  gsap.from(contentRef.value, {
    y: 50,
    delay: 0.5,
    duration: 0.7,
    opacity: 0,
    ease: "back",
  });
});
</script>

<style lang="scss">
.song-placeholder {
  display: none;
}
@media screen and (min-width: 1024px) {
  .song-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
    &-content {
      text-align: center;
    }
    &-img {
      position: absolute;
      z-index: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 80%;
        height: 80%;
        path {
          fill: var(--color-black-600);
        }
      }
      &-fighters {
        right: 0;
      }
    }
  }
}
</style>
