<template>
  <div
    ref="playerContainerEl"
    class="player-container"
    :class="{ 'player-container-open': playerVisible }"
  >
    <div ref="playerBodyEl" class="player-body">
      <div class="player-view" ref="playerViewEl">
        <div class="gradient-fade"></div>
        <IconButton
          class="button-return"
          icon-name="chevron-down"
          :size="20"
          @click="closeSong"
        />
        <LyricReader
          ref="lyricsEl"
          :song="currentSong"
          :audio-element-el="audioElementEl"
        />
        <div class="player-wrapper" v-if="currentSong">
          <div class="player-main-information">
            <SongInformation
              ref="songInformationEl"
              :song="currentSong"
              @viewInformationClick="viewInformation"
            />
            <div class="player-controls">
              <audio
                ref="audioElementEl"
                :src="songSource"
                @timeupdate="getTime"
                preload="metadata"
              ></audio>
              <div
                ref="playerProgressEl"
                class="progress-wrapper"
                :class="{ '-disabled': !isPlaying }"
                @click="scrub"
                @mousedown="mousedown = true"
                @mouseup="mousedown = false"
                @mousemove="updateProgress($event)"
                @touchstart="mousedown = true"
                @touchend="mousedown = false"
                @touchmove="updateProgress($event)"
              >
                <div class="progress" ref="progressBarEl">
                  <div
                    class="current-progress"
                    :style="{ width: percent }"
                  ></div>
                </div>
              </div>
              <div ref="playerTimerEl" class="timers">
                <p>{{ currentTime }}</p>
                <p>{{ songDuration }}</p>
              </div>
            </div>
          </div>
          <div class="player-buttons">
            <button
              ref="prevButtonEl"
              aria-label="go previous song"
              class="player-button-prev"
              @click="goPrev"
            >
              <Icon name="prev" size="20" />
            </button>
            <button
              :aria-label="isPlaying ? 'pause song' : 'play song'"
              ref="playButtonEl"
              class="player-button"
              @click="playPause"
            >
              <Icon v-if="isPlaying" name="pause" :size="30" />
              <Icon v-else name="play" :size="30" />
            </button>
            <button
              ref="nextButtonEl"
              aria-label="go next song"
              class="player-button-next"
              @click="goNext"
            >
              <Icon name="next" size="20" />
            </button>
          </div>
        </div>
      </div>
      <div class="information-view" ref="informationViewEl">
        <SongDetails
          @goBack="viewPlayer"
          :history="currentSong.history"
          :song-translation="songTranslation"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "@/components/component-library/Icon.vue";
import { useAppStore } from "@/stores/app.store";
import { storeToRefs } from "pinia";
import { useSongStore } from "@/stores/song.store";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { usePlayerProgress } from "@/composables/usePlayerProgress";
import gsap from "gsap";
import LyricReader from "@/components/player/LyricReader.vue";
import SongInformation from "@/components/player/SongInformation.vue";
import SongDetails from "@/components/player/SongDetails.vue";
import { S3_SOURCE_LINK, S3Dir } from "@/domain/enums/aws-link";
import {
  onKeyStroke,
  useMagicKeys,
  useMediaQuery,
  whenever,
} from "@vueuse/core";
import IconButton from "@/components/component-library/IconButton.vue";
import { useKeyboardControls } from "@/composables/useKeyboardControls";
import {
  fadeInAnimation,
  playerContainerEase,
  playerControlsScale,
} from "@/components/player/constants";
import { VIEWS } from "@/components/player/enums";
import { useNavigation } from "@/stores/navigation.store";
import { setNewState } from "@/views/historyState";

const isPlaying = ref(false);
const mousedown = ref(false);

const audioContext = ref();

const currentView = ref(VIEWS.PLAYER);

const audioElementEl = ref();
const progressBarEl = ref();
const playerContainerEl = ref();
const songInformationEl = ref();
const playerProgressEl = ref();
const playerTimerEl = ref();
const playButtonEl = ref();
const nextButtonEl = ref();
const prevButtonEl = ref();
const lyricsEl = ref();
const playerBodyEl = ref();
const informationViewEl = ref();
const playerViewEl = ref();

const { hidePlayer } = useAppStore();
const { playerVisible } = storeToRefs(useAppStore());
const { currentSong } = storeToRefs(useSongStore());
const { pushState } = useNavigation();
const { state: historyState } = storeToRefs(useNavigation());
const { resetSong, setNextSong, setPreviousSong } = useSongStore();

const isLargeScreen = useMediaQuery("(min-width: 1024px)");
const { player } = useKeyboardControls();
const { percent, currentTime, songDuration, scrub, setTimers, getTime } =
  usePlayerProgress(audioElementEl, progressBarEl);

const songSource = computed(() =>
  currentSong.value ? S3_SOURCE_LINK(S3Dir.SONGS, currentSong.value.source) : ""
);

const songTranslation = computed(() => {
  if (!(currentSong.value && currentSong.value.translation)) return [];

  return currentSong.value.translation.split("\n");
});

const closeSong = () => {
  gsap.to(playerContainerEl.value, {
    duration: 0.7,
    ease: "power4.out",
    opacity: 0.7,
    y: "100vh",
    onComplete: () => {
      resetSong();
      hidePlayer();
      pushState({ player: false });
    },
  });
};

const updateProgress = ($event: any) => {
  if (!mousedown.value) return;
  scrub($event);
};

const playSong = () => {
  audioElementEl.value.play();
  isPlaying.value = true;
};

const pauseSong = () => {
  audioElementEl.value.pause();
  isPlaying.value = false;
};

const playPause = () => {
  if (audioContext.value.state === "suspended") {
    audioContext.value.resume();
  }
  if (isPlaying.value === false) {
    playSong();
  } else if (isPlaying.value === true) {
    pauseSong();
  }

  gsap.from(playButtonEl.value, playerControlsScale);
};

const goNext = () => {
  setNextSong();
  gsap.from(nextButtonEl.value, playerControlsScale);
};

const goPrev = () => {
  setPreviousSong();
  gsap.from(prevButtonEl.value, playerControlsScale);
};

const viewInformation = () => {
  pushState({ details: true });
  currentView.value = VIEWS.DETAILS;
  if (isLargeScreen.value) {
    gsap.to(playerViewEl.value, {
      opacity: "0.3",
      ...playerContainerEase,
    });
    gsap.to(informationViewEl.value, {
      x: "0",
      opacity: "1",
      ...playerContainerEase,
    });
    return;
  }
  gsap.to(playerBodyEl.value, {
    x: "-100vw",
    ...playerContainerEase,
  });
};

const viewPlayer = () => {
  currentView.value = VIEWS.PLAYER;
  pushState({ details: false });
  if (isLargeScreen.value) {
    gsap.to(playerViewEl.value, {
      opacity: "1",
      ...playerContainerEase,
    });
    gsap.to(informationViewEl.value, {
      x: "60rem",
      opacity: "0.5",
      ...playerContainerEase,
    });
    return;
  }
  gsap.to(playerBodyEl.value, {
    x: "0",
    ease: "circ.inOut",
    duration: "0.6",
  });
};

const initAudioFile = () => {
  const AudioContext =
    window.AudioContext || (window as any).webkitAudioContext;
  audioContext.value = new AudioContext();
  audioElementEl.value.crossOrigin = "anonymous";

  const track = audioContext.value.createMediaElementSource(
    audioElementEl.value
  );

  track.connect(audioContext.value.destination);

  track.mediaElement.addEventListener("loadedmetadata", setTimers);
  track.mediaElement.addEventListener("canplaythrough", playSong);
  track.mediaElement.addEventListener("ended", () => {
    isPlaying.value = false;
    setNextSong();
  });
};

onKeyStroke(player.playPause, (e) => {
  e.preventDefault();
  playPause();
});

onKeyStroke(player.decProgress, (e) => {
  e.preventDefault();
  audioElementEl.value.currentTime -= 1;
});

onKeyStroke(player.incProgress, (e) => {
  e.preventDefault();
  audioElementEl.value.currentTime += 1;
});

onKeyStroke(player.closePlayer, (e) => {
  e.preventDefault();
  if (currentView.value === VIEWS.PLAYER) {
    closeSong();
  } else {
    viewPlayer();
  }
});

watch(player.songDetails, (v) => {
  if (v) {
    if (currentView.value === VIEWS.PLAYER) {
      viewInformation();
    } else {
      viewPlayer();
    }
  }
});

watch(player.prevSong, (v) => {
  if (v) goPrev();
});

watch(player.nextSong, (v) => {
  if (v) goNext();
});

watch(
  () => historyState.value.player,
  (value) => {
    if (!value) closeSong();
  }
);

onMounted(() => {
  const t1 = gsap.timeline();
  t1.from(playerContainerEl.value, {
    duration: 0.7,
    ease: "expo.out",
    opacity: 0.7,
    y: "100vh",
  })
    .from(songInformationEl.value.containerRef, fadeInAnimation, "-=0.45")
    .from(lyricsEl.value.containerRef, fadeInAnimation, "-=0.55")
    .from(playerProgressEl.value, fadeInAnimation, "-=0.5")
    .from(playerTimerEl.value, fadeInAnimation, "-=0.6")
    .from(playButtonEl.value, fadeInAnimation, "-=0.7")
    .from(prevButtonEl.value, fadeInAnimation, "-=0.65")
    .from(nextButtonEl.value, fadeInAnimation, "-=0.65");
  initAudioFile();
});
</script>

<style lang="scss">
.player-main-information {
  width: 100%;
}

.player-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 200vw;
  height: 100vh;
  z-index: 10;
  background: var(--color-background);
}

.player-body {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  & > div {
    flex: 1;
  }
}

.player-view {
  @media only screen and (max-device-width: 1024px) {
    margin-bottom: 10rem;
  }
  @media only screen and (max-device-width: 767px) {
    margin-bottom: 5rem;
  }
  @media all and (display-mode: standalone) {
    margin-bottom: 0;
  }
}

.gradient-fade {
  position: absolute;
  background: rgb(245, 245, 245);
  background: linear-gradient(
    0deg,
    rgba(var(--color-background-rgb), 0) 0%,
    rgba(var(--color-background-rgb), 1) 40%
  );
  height: 5rem;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
}

.player-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2.5rem 1.5rem;
  background: rgb(245, 245, 245);
  background: linear-gradient(
    180deg,
    rgba(var(--color-background-rgb), 0) 0%,
    rgba(var(--color-background-rgb), 1) 15%
  );
}

.player-controls {
  width: 100%;
  margin-top: 0.5rem;
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
  &:active {
    .current-progress:after {
      transform: translateY(-50%) scale(2);
    }
  }
}

.current-progress {
  height: 100%;
  width: 0;
  border-radius: 1rem 0 0 1rem;
  background: var(--color-black-950);
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
    transition: transform 0.2s cubic-bezier(0.83, 0, 0.17, 1);
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
  width: 7.5rem;
  height: 7.5rem;
  border: none;
  box-shadow: 0 0 0 0.4rem rgba(var(--color-black-950-rgb), 0.1);
  cursor: pointer;
  margin: 0 2rem;
  > .icon-wrapper {
    path {
      stroke: var(--color-black-50);
    }
  }
  &-prev,
  &-next {
    background: transparent;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    border: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0;
    padding: 0;
    > .icon-wrapper {
      path {
        stroke: var(--color-black-950);
      }
    }
  }
}

.player-buttons {
  display: flex;
  align-items: center;
}

@media screen and (min-width: 1024px) {
  .player-buttons {
    position: absolute;
    top: 4rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .player-button {
    width: 5rem;
    height: 5rem;
    margin: 0 4rem;
    > .icon-wrapper {
      width: 2rem;
      height: 2rem;
    }
  }
  .player-main-information {
    flex: 1;
    margin-right: 3rem;
  }
  .player {
    flex: 1;
    overflow: hidden;
    position: relative;
    background: var(--color-black-50);
    .gradient-fade {
      background: var(--color-black-50);
      background: linear-gradient(
        0deg,
        rgba(var(--color-black-50-rgb), 0) 0%,
        rgba(var(--color-black-50-rgb), 1) 40%
      );
    }
    .player-wrapper {
      flex-direction: row;
      height: 16rem;
      padding: 2.5rem 1.5rem 0;
      background: rgba(var(--color-black-50-rgb), 0.5);
      background: linear-gradient(
        180deg,
        rgba(var(--color-black-50-rgb), 0) 0%,
        rgba(var(--color-black-50-rgb), 1) 25%
      );
    }
  }
  .lyrics {
    height: 100vh;
    padding-bottom: 16rem;
  }
  .player-controls {
    margin-top: 0;
  }
  .player-container {
    position: relative;
    width: 100%;
    z-index: 0;
    background: var(--color-black-50);
  }
  .information-view {
    position: fixed;
    right: 0;
    opacity: 0.5;
    max-width: 60rem;
    width: 100%;
    background: var(--color-background);
    transform: translateX(60rem);
  }
}
</style>
