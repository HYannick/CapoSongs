<template>
  <div ref="containerRef" class="song-list-container">
    <div class="song-list-heading">
      <h2
        class="text-dot -left text -extra-bold"
        v-html="t('songList.title')"
      ></h2>
    </div>
    <NotFound
      v-if="!songs.length"
      :title="t('songList.notFound')"
      :sub-title="t('songList.notFoundDetails')"
    />
    <div class="song-list" v-else>
      <SongItem
        ref="songItemRef"
        v-for="song in songs"
        :song="song"
        :key="song.id"
        @selected="setSong"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType, Ref } from "vue";
import type { Song } from "@/domain/Song";
import { useAppStore } from "@/stores/app.store";
import { useSongStore } from "@/stores/song.store";
import { useI18n } from "vue-i18n";
import { onMounted, ref, watch } from "vue";
import gsap from "gsap";
import SongItem from "@/components/SongItem.vue";
import NotFound from "@/components/common/NotFound.vue";
import { storeToRefs } from "pinia";
import type { SongItemRef } from "@/domain/SongItem";
import { useMediaQuery } from "@vueuse/core";

defineProps({
  songs: Array as PropType<Song[]>,
});
const containerRef = ref();
const songItemRef = ref();
const songItemRefs: Ref<SongItemRef[]> = ref([]);
const { showPlayer } = useAppStore();
const { currentSong } = storeToRefs(useSongStore());
const { loadSong } = useSongStore();
const isLargeScreen = useMediaQuery("(min-width: 1024px)");
const { t } = useI18n();

const opacity = (opacity: number) => ({
  duration: 0.3,
  opacity,
});

const setSong = (song: Song) => {
  loadSong(song);
  showPlayer();
};
const animateOnSongSelected = (song: Song) => {
  const currentSongItem = songItemRefs.value.find((el) => el.id === song.id);
  const songItems = songItemRefs.value
    .filter((el) => el.id !== currentSongItem!.id)
    .map((el) => el.container);

  if (currentSongItem) {
    gsap.fromTo(currentSongItem.container, opacity(0.4), opacity(1));
    gsap.to(songItems, opacity(0.4));
  } else {
    gsap.to(songItems, opacity(1));
  }
};
const fadeInAllSongItems = () => {
  gsap.to(
    songItemRefs.value.map((el) => el.container),
    {
      duration: 0.7,
      opacity: 1,
    }
  );
};
const staggerShowAllSongItems = () => {
  gsap.from(
    songItemRefs.value.map((el) => el.container),
    {
      duration: 0.7,
      ease: "back",
      opacity: 0,
      y: "10px",
      stagger: 0.1,
    }
  );
};

watch(
  () => currentSong.value,
  (song) => {
    if (!isLargeScreen.value) return;
    if (!song) {
      fadeInAllSongItems();
      return;
    }
    animateOnSongSelected(song);
  }
);

onMounted(() => {
  songItemRefs.value = Array.from(songItemRef.value) as SongItemRef[];
  staggerShowAllSongItems();
});
defineExpose({ containerRef });
</script>

<style lang="scss">
.song-list-heading {
  margin-bottom: 2rem;

  h2 {
    margin: 0;
    line-height: 5rem;
    font-size: 3rem;
  }

  .text-dot.-left:after {
    left: 0.8rem;
  }
}
@media screen and (min-width: 1024px) {
  .song-list-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    position: relative;

    .song-list-heading {
      z-index: 2;
    }

    &:before {
      content: "";
      position: absolute;
      background: rgb(245, 245, 245);
      background: linear-gradient(
        0deg,
        rgba(var(--color-background-rgb), 0) 0%,
        rgba(var(--color-background-rgb), 1) 40%
      );
      height: 6rem;
      top: 4rem;
      z-index: 1;
      left: 0;
      right: 0;
    }

    &:after {
      content: "";
      position: absolute;
      background: rgb(245, 245, 245);
      background: linear-gradient(
        180deg,
        rgba(var(--color-background-rgb), 0) 0%,
        rgba(var(--color-background-rgb), 1) 40%
      );
      height: 6rem;
      z-index: 1;
      bottom: 0rem;
      left: 0;
      right: 0;
    }
  }
  .song-list {
    overflow-y: auto;
    height: 100%;
    padding: 2rem 0 5rem;
  }
}
</style>
