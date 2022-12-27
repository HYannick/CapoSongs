<template>
  <div class="lyrics" ref="lyricsContainerEl">
    <p
      class="lyric-line text -bold"
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
  liricleInstance.offset = 200;
  liricleInstance.on("load", (data: any) => {
    lyrics.value = data.lines.map((line: any, index: number) => ({
      ...line,
      index,
    }));
  });
  liricleInstance.on("sync", (line: LyricLine, word: LyricLine) => {
    console.log(line);
    currentLineIndex.value = line.index;
  });
  liricleInstance.load({
    url: S3_SOURCE_LINK(S3Dir.LYRICS, lyricsLink),
  });
  props.audioElementEl.addEventListener("timeupdate", () => {
    liricleInstance.sync(props.audioElementEl.currentTime);
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
.lyrics {
  height: 75vh;
  overflow-y: scroll;
  padding: 10rem 2rem;
}
.lyric-line {
  text-align: center;
  font-size: 4rem;
  color: var(--color-black-500);
  margin-bottom: 1rem;
  transform: scale(1);
  transition: color 0.3s cubic-bezier(0.83, 0, 0.17, 1),
    transform 0.3s cubic-bezier(0.83, 0, 0.17, 1);
  &.-passed {
    color: var(--color-black-950);
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
