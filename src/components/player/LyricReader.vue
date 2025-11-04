<template>
  <IconButton
    :data-title="t('onboarding.player.step1.title')"
    :data-intro="t('onboarding.player.step1.text')"
    class="coro-highlighter"
    :class="{ '-activated': coroHighlighted }"
    @click="highlightCoro"
    icon-name="wand"
    :size="24"
  />
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
import IconButton from '@/components/component-library/IconButton.vue'
import { useKeyboardControls } from '@/composables/useKeyboardControls'
import type { LyricLine } from '@/domain/LyricLine'
import type { Song } from '@/domain/Song'
import { S3Dir, S3_SOURCE_LINK } from '@/domain/enums/aws-link'
import Liricle from 'liricle'
import type { Ref } from 'vue'
import { nextTick, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHapticsFeedback } from "@/composables/useHapticsFeedback.ts";

const props = defineProps<{ song: Song; audioElementEl: any }>()
const lyrics: Ref<LyricLine[]> = ref([])
const lyricsContainerEl = ref()
const currentLineIndex = ref(0)
const coroHighlighted = ref(false)
const { t } = useI18n()
const {triggerHaptics} = useHapticsFeedback();
let liricleInstance: any

const { player } = useKeyboardControls()
watch(player.highlightCoro, (v) => {
  if (v) highlightCoro()
})

const resetLineIndex = () => {
  currentLineIndex.value = 0
}

const highlightCoro = () => {
  triggerHaptics();
  coroHighlighted.value = !coroHighlighted.value
}

const initLyricReader = (lyricsLink: string) => {
  if (!lyricsLink) return
  liricleInstance = new Liricle()
  liricleInstance.offset = 1000
  liricleInstance.on('load', (data: any) => {
    lyrics.value = data.lines.map(
      (line: LyricLine, index: number): LyricLine => ({
        ...line,
        index,
        text: line.text.replace(':margin:', '').replace(':coro:', ''),
        isCoro: line.text.includes(':coro:'),
        spaced: line.text.includes(':margin:'),
      }),
    ) as LyricLine[]
  })
  liricleInstance.on('sync', (line: LyricLine) => {
    currentLineIndex.value = line.index
  })
  liricleInstance.load({
    url: S3_SOURCE_LINK(S3Dir.LYRICS, lyricsLink),
  })
  props.audioElementEl.addEventListener('timeupdate', () => {
    liricleInstance.sync(props.audioElementEl.currentTime)
  })
  return liricleInstance
}

const scrollIntoLine = () => {
  const currentLine = lyricsContainerEl.value.querySelector('.-highlighted')
  currentLine.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  })
}

const reloadLyrics = (song?: Song) => {
  if (!song) return
  resetLineIndex()
  initLyricReader(song.lyrics_link)
  nextTick().then(scrollIntoLine)
}

watch(() => currentLineIndex.value, scrollIntoLine)

watch(
  () => props.audioElementEl,
  (audioRef) => {
    if (!audioRef) return
    initLyricReader(props.song!.lyrics_link)
  },
  { immediate: true },
)

watch(() => props.song, reloadLyrics)

defineExpose({ containerRef: lyricsContainerEl })
</script>

<style lang="scss">
.coro-highlighter {
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 4rem;
  height: 4rem;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4rem;
  cursor: pointer;
  border: transparent;
  @media screen and (max-width: 1024px) {
    right: calc(200vw / 2 + 1rem);
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
    scroll-margin-top: -10rem;
  }

  @media only screen and (max-device-width: 1024px) {
    font-size: 4rem;
  }
  @media only screen and (max-device-width: 767px) {
    font-size: 2.2rem;
  }
}
</style>
