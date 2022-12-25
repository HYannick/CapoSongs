<template>
  <div class="lyrics" ref="lyricsContainerEl">
    <p
      class="lyric-line text -large-body -bold"
      :key="lyric.index"
      v-for="lyric in lyrics"
      :class="{
        '-highlighted': lyric.index === currentLineIndex,
        '-passed': lyric.index < currentLineIndex,
      }"
    >
      {{ lyric.text }}
    </p>
  </div>
</template>
<script lang="ts" setup>
import type { LyricLine } from "@/domain/LyricLine";
import type { PropType } from "vue";
import { ref, watch } from "vue";
const lyricsContainerEl = ref();
const props = defineProps({
  currentLineIndex: Number,
  lyrics: Array as PropType<LyricLine[]>,
});
const scrollIntoLine = () => {
  const currentLine = lyricsContainerEl.value.querySelector(".-highlighted");
  currentLine.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
};
watch(() => props.currentLineIndex, scrollIntoLine);
defineExpose({ containerRef: lyricsContainerEl });
</script>

<style lang="scss">
.lyrics {
  height: 75vh;
  overflow-y: scroll;
  padding: 10rem 2rem;
}
.lyric-line {
  text-align: center;
  font-size: 2.5rem;
  color: var(--color-black-500);
  margin-bottom: 1rem;
  &.-passed {
    color: var(--color-black-950);
  }
  &.-highlighted {
    font-weight: bold;
    color: var(--color-primary-600);
  }
}
</style>
