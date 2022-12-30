<template>
    <IconButton class="coro-highlighter"
                :class="{ '-activated': coroHighlighted }"
                @click="highlightCoro" icon-name="wand" :size="24" />
  <div
    class="lyrics"
    ref="lyricsContainerEl"
    :class="{ '-coro-highlighted': coroHighlighted }"
  >
    <p
      class="lyric-line text -bold"
      :key="`${song.id}-${lyric.index}`"
      v-for="lyric in lyrics"
      :class="{
        '-highlighted': lyric.index === currentLineIndex,
        '-passed': lyric.index < currentLineIndex,
        '-coro': lyric.isCoro,
        '-spaced': lyric.spaced,
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
import Icon from "@/components/component-library/Icon.vue";
import { onKeyStroke } from "@vueuse/core";
import IconButton from "@/components/component-library/IconButton.vue";
import { useKeyboardControls } from "@/composables/useKeyboardControls";

const props = defineProps({
  currentLineIndex: Number,
  lyrics: Array as PropType<LyricLine[]>,
  song: Object as PropType<Song>,
  audioElementEl: Object as PropType<any>,
});
const lyrics: Ref<LyricLine[]> = ref([]);
const lyricsContainerEl = ref();
const currentLineIndex = ref(0);
const coroHighlighted = ref(false);
let liricleInstance: any;

const {player} = useKeyboardControls();
watch(player.highlightCoro, (v) => {
  if (v) highlightCoro();
});

const resetLineIndex = () => {
  currentLineIndex.value = 0;
};

const highlightCoro = () => {
  coroHighlighted.value = !coroHighlighted.value;
};

const initLyricReader = (lyricsLink: string) => {
  if (!lyricsLink) return;
  liricleInstance = new Liricle();
  liricleInstance.offset = 1000;
  liricleInstance.on("load", (data: any) => {
    lyrics.value = data.lines.map((line: LyricLine, index: number) => ({
      ...line,
      index,
      text: line.text.replace(":margin:", "").replace(":coro:", ""),
      isCoro: line.text.includes(":coro:"),
      spaced: line.text.includes(":margin:"),
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
.coro-highlighter {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4rem;
  cursor: pointer;
  border: transparent;
  @media screen and (max-width: 1024px) {
    right: calc(200vw / 2 + 2rem);
  }
  span {
    color: var(--color-black-950);
  }

  &.icon-button .icon path {
    stroke: var(--color-black-950);
  }

  &.-activated {
    background: var(--color-secondary-600);
    box-shadow: 0 0 0 0.4rem rgba(var(--color-secondary-600-rgb), 0.2);
    &.icon-button .icon path {
      stroke: var(--color-black-50);
    }
  }
}

.lyrics {
  height: 75vh;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 10rem 2rem;

  &.-coro-highlighted {
    .lyric-line {
      opacity: 0.2;

      &.-coro {
        opacity: 1;
      }
    }
  }
}

.lyric-line {
  text-align: center;
  font-size: 3.5rem;
  color: var(--color-black-400);
  margin-bottom: 0.5rem;
  transform: scale(1);
  transition: color 0.3s cubic-bezier(0.83, 0, 0.17, 1),
    transform 0.3s cubic-bezier(0.83, 0, 0.17, 1),
    opacity 0.5s cubic-bezier(0.83, 0, 0.17, 1);

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
