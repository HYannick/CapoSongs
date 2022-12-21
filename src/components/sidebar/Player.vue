<template>
  <div
    ref="playerContainer"
    class="player-container"
    :class="{ 'player-container-open': playerVisible }"
  >
    <div class="player-body">
      <button class="button-return" @click="closeSong">
        <Icon name="chevron-left" />
        <span class="button-return-label text -bold">
          {{ t("common.backButton") }}
        </span>
      </button>
      <div class="lyrics" ref="lyricsRef">
        <p
          class="lyric-line text -large-body -bold"
          ref="lyricLine"
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
      <div class="player-wrapper" v-if="currentSong">
        <div ref="playerSong" class="player-song">
          <div ref="songThumbnail" class="player-song-thumbnail">
            <img :src="currentSong.thumbnail" alt="song-thumbnail" />
          </div>
          <p ref="songTitle" class="player-song-title text -black">
            {{ currentSong.title }}
          </p>
          <div class="player-song-action">
            <div ref="infoAction">
              <IconButton
                ref="infoAction"
                type="button"
                icon-name="circle-info"
                radius="circle"
                :size="24"
              />
            </div>
            <div ref="favouriteAction">
              <FavouriteIcon :song="currentSong" />
            </div>
          </div>
        </div>
        <div class="player-controls">
          <div
            ref="playerProgress"
            class="progress-wrapper"
            @click="scrub"
            @mousedown="mousedown = true"
            @mouseup="mousedown = false"
            @mousemove="mousedown && scrub($event)"
            @touchmove="mousedown && scrub($event)"
          >
            <div class="progress" ref="progress">
              <div class="current-progress" :style="{ width: percent }"></div>
            </div>
          </div>

          <div ref="playerTimer" class="timers">
            <p>{{ currentTime }}</p>
            <p>{{ songDuration }}</p>
          </div>
          <button ref="playButton" class="player-button" @click="playPause">
            <Icon v-if="isPlaying" name="pause" :size="30" />
            <Icon v-else name="play" :size="30" />
          </button>
        </div>
      </div>
      <audio
        ref="audioElement"
        :src="songSource"
        @timeupdate="updateLyricsAndTime($event.target.currentTime)"
      ></audio>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "@/components/component-library/Icon.vue";
import { useAppStore } from "@/stores/app.store";
import { storeToRefs } from "pinia";
import { useSongStore } from "@/stores/song.store";
import IconButton from "@/components/component-library/IconButton.vue";
import FavouriteIcon from "@/components/FavouriteIcon.vue";
import { computed, onMounted, Ref, ref, watch } from "vue";
import { usePlayerProgress } from "@/composables/usePlayerProgress";
import { useI18n } from "vue-i18n";
import gsap from "gsap";
import Liricle from "liricle";
import type { LyricLine } from "@/domain/LyricLine";
const { hidePlayer } = useAppStore();
const { playerVisible } = storeToRefs(useAppStore());
const { currentSong } = storeToRefs(useSongStore());
const { resetSong } = useSongStore();

const { t } = useI18n();

const isPlaying = ref(false);

const audioContext = ref();

const audioElement = ref();
const progress = ref();

const playerContainer = ref();
const playerSong = ref();
const playerProgress = ref();
const playerTimer = ref();
const playButton = ref();
const lyricsRef = ref();
const lyricLine = ref();
const currentLineIndex: Ref<number> = ref(0);
const lyrics: Ref<LyricLine[]> = ref([]);

const { percent, currentTime, songDuration, scrub, setTimers, getTime } =
  usePlayerProgress(audioElement, progress);

const mousedown = ref(false);
let liricle: any;
const closeSong = () => {
  gsap.to(playerContainer.value, {
    duration: 0.7,
    ease: "power4.out",
    opacity: 0.7,
    y: "100vh",
    onComplete: () => {
      resetSong();
      hidePlayer();
    },
  });
};

const updateLyricsAndTime = (currentTime: number) => {
  getTime();
  liricle.sync(currentTime, false);
};

const playPause = () => {
  if (audioContext.value.state === "suspended") {
    audioContext.value.resume();
  }
  if (isPlaying.value === false) {
    audioElement.value.play();
    isPlaying.value = true;
  } else if (isPlaying.value === true) {
    audioElement.value.pause();
    isPlaying.value = false;
  }

  gsap.from(playButton.value, {
    duration: 0.2,
    scale: 0.9,
  });
};

const songSource = computed(() =>
  currentSong.value
    ? `https://capoeira-songs.s3.eu-west-3.amazonaws.com/songs/${currentSong.value.source}`
    : ""
);

const initAudioFile = () => {
  audioContext.value = new AudioContext();
  audioElement.value.crossOrigin = "anonymous";

  const track = audioContext.value.createMediaElementSource(audioElement.value);

  track.connect(audioContext.value.destination);
  track.mediaElement.addEventListener("canplaythrough", setTimers);

  liricle = new Liricle();
  liricle.on("load", (data: any) => {
    lyrics.value = data.lines.map((line: any, index: number) => ({
      ...line,
      index,
    }));
  });
  liricle.on("sync", (line: LyricLine, word: LyricLine) => {
    currentLineIndex.value = line.index;
  });
  liricle.load({
    url: `https://capoeira-songs.s3.eu-west-3.amazonaws.com/lyrics/${
      currentSong.value!.lyrics_link
    }`,
  });
};

onMounted(() => {
  const t1 = gsap.timeline();
  t1.from(playerContainer.value, {
    duration: 0.7,
    ease: "power4.out",
    opacity: 0.7,
    y: "100vh",
  })
    .from(
      playerSong.value,
      {
        duration: 0.7,
        ease: "back",
        opacity: 0,
        y: "10px",
      },
      "-=0.45"
    )
    .from(
      lyricsRef.value,
      {
        opacity: 0,
        y: "10px",
        ease: "back",
      },
      "-=0.55"
    )
    .from(
      playerProgress.value,
      {
        duration: 0.7,
        ease: "back",
        opacity: 0,
        y: "10px",
      },
      "-=0.5"
    )
    .from(
      playerTimer.value,
      {
        duration: 0.7,
        ease: "back",
        opacity: 0,
        y: "10px",
      },
      "-=0.6"
    )
    .from(
      playButton.value,
      {
        duration: 0.7,
        ease: "back",
        opacity: 0,
        y: "10px",
      },
      "-=0.7"
    );
  initAudioFile();
});
</script>

<style lang="scss">
.player-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background: var(--color-background);
}

.player-body {
  position: relative;
  width: 100%;
  height: 100%;
}

.button-return {
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  z-index: 9;
  align-items: center;
  justify-content: center;
  color: var(--color-black-950);
  background: transparent;
  border: transparent;
  cursor: pointer;

  path {
    stroke: var(--color-black-950);
  }

  &-label {
    margin-left: 0.4rem;

    &:after {
      content: "";
      width: 0.4rem;
      height: 0.4rem;
      background: var(--color-primary-600);
      position: absolute;
      border-radius: 1rem;
      bottom: -0.5rem;
      left: 0.3rem;
    }
  }
}

.player-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 30rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2.5rem;
  background: rgb(245, 245, 245);
  background: linear-gradient(
    180deg,
    rgba(var(--color-background-rgb), 0) 0%,
    rgba(var(--color-background-rgb), 1) 25%
  );
}

.player-song {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
}

.player-song-thumbnail {
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0.4rem 0.4rem rgba(var(--color-primary-950-rgb), 0.25);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.player-song-title {
  flex: 1;
}

.player-song-action {
  display: flex;
  align-items: center;

  .icon-wrapper {
    path {
      stroke: var(--color-black-950);
      stroke-width: 2.5;
    }
  }
}

.player-controls {
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.progress-wrapper {
  width: 100%;
  height: 3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.progress {
  width: 100%;
  height: 0.4rem;
  background: var(--color-black-200);
  border-radius: 1rem;
}

.current-progress {
  height: 100%;
  width: 0;
  border-radius: 1rem 0 0 1rem;
  background: var(--color-black-950);
  transition: width 0.3s;

  &:after {
    content: "";
    position: absolute;
    right: -0.5rem;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 1.5rem;
    width: 1rem;
    height: 1rem;
    background: var(--color-black-950);
  }
}

.timers {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.player-button {
  background-color: var(--color-black-950);
  border-radius: 50%;
  width: 8.5rem;
  height: 8.5rem;
  border: none;
  box-shadow: 0 0 0 0.4rem rgba(var(--color-black-950-rgb), 0.1);
  cursor: pointer;

  > .icon-wrapper {
    path {
      stroke: var(--color-black-50);
    }
  }
}
.lyrics {
  height: 75vh;
  padding-top: 10rem;
  padding-bottom: 10rem;
  overflow-y: scroll;
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
