<template>
  <div class="legend">
    <div class="coro-color"></div>
    <p class="text -bold -body">Coro</p>
  </div>
  <div class="lyrics" ref="lyricsContainerEl">
    <p
      class="lyric-line text -bold"
      :key="`${song.id}-${lyric.index}`"
      v-for="lyric in lyrics"
      :class="{
        '-highlighted': lyric.index === currentLineIndex,
        '-passed': lyric.index < currentLineIndex,
        '-coro': lyric.isCoro,
        '-spaced': lyric.spaced
      }"
    >
      {{ lyric.text }}
    </p>
  </div>
</template>
<script lang="ts" setup>
import type { LyricLine } from "@/domain/LyricLine";
import type { PropType } from "vue";
import { nextTick, Ref, ref, watch } from "vue";
import type { Song } from "@/domain/Song";
import Liricle from "liricle";
import { S3_SOURCE_LINK, S3Dir } from "@/domain/enums/aws-link";

const props = defineProps({
  currentLineIndex: Number,
  lyrics: Array as PropType<LyricLine[]>,
  song: Object as PropType<Song>,
  audioElementEl: Object as PropType<any>,
});
const lyrics: Ref<LyricLine[]> = ref([]);
const lyricsContainerEl = ref();
const currentLineIndex = ref(0);

let liricleInstance: any;

const resetLineIndex = () => {
  currentLineIndex.value = 0;
};

const initLyricReader = (lyricsLink: string) => {
  if (!lyricsLink) return;
  liricleInstance = new Liricle();
  liricleInstance.offset = 1000;
  liricleInstance.on("load", (data: any) => {
    lyrics.value = data.lines.map((line: LyricLine, index: number) => ({
      ...line,
      index,
      text: line.text.replace(':margin:', '').replace(':coro:', ''),
      isCoro: line.text.includes(':coro:'),
      spaced: line.text.includes(':margin:')
    }));
  });
  liricleInstance.on("sync", (line: LyricLine) => {
    currentLineIndex.value = line.index;
  });
  liricleInstance.load({
    url: S3_SOURCE_LINK(S3Dir.LYRICS, lyricsLink),
  });
  props.audioElementEl.addEventListener("timeupdate", () => {
    try {
      liricleInstance.sync(props.audioElementEl.currentTime);
    } catch (e) {
      // Lib issue on lyrics reloading
      return;
    }
  });
  return liricleInstance;
};

const scrollIntoLine = () => {
  const currentLine = lyricsContainerEl.value.querySelector(".-highlighted");
  currentLine.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
};

const reloadLyrics = (song?: Song) => {
  if (!song) return;
  resetLineIndex();
  initLyricReader(song.lyrics_link);
  nextTick().then(scrollIntoLine);
};

watch(() => currentLineIndex.value, scrollIntoLine);

watch(
  () => props.audioElementEl,
  (audioRef) => {
    if (!audioRef) return;
    initLyricReader(props.song!.lyrics_link);
  },
  { immediate: true }
);

watch(() => props.song, reloadLyrics);

defineExpose({ containerRef: lyricsContainerEl });
</script>

<style lang="scss">
.legend {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1024px) {
    right: calc(200vw / 2 + 2rem);
  }
  .coro-color {
    width: 2rem;
    height: 1rem;
    background: var(--color-secondary-600);
    margin-right: 1rem;
    border-radius: 2rem;
  }
}
.lyrics {
  height: 75vh;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 10rem 2rem;
}
.lyric-line {
  text-align: center;
  font-size: 3.5rem;
  color: var(--color-black-400);
  margin-bottom: 0.5rem;
  transform: scale(1);
  transition: color 0.3s cubic-bezier(0.83, 0, 0.17, 1),
    transform 0.3s cubic-bezier(0.83, 0, 0.17, 1);
  &.-passed {
    color: var(--color-black-950);
  }
  &.-coro {
    color: var(--color-secondary-600);
  }
  &.-spaced {
    margin-top: 5rem;
  }
  &.-highlighted {
    font-weight: bold;
    color: var(--color-primary-600);
    transform: scale(1.1);
  }
  @media only screen and (max-device-width: 1024px) {
    font-size: 4rem;
  }
  @media only screen and (max-device-width: 767px) {
    font-size: 2.2rem;
  }
}
</style>
