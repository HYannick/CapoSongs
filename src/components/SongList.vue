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
import type { PropType } from "vue";
import type { Song } from "@/domain/Song";
import { useAppStore } from "@/stores/app.store";
import { useSongStore } from "@/stores/song.store";
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import gsap from "gsap";
import SongItem from "@/components/SongItem.vue";
import NotFound from "@/components/common/NotFound.vue";

defineProps({
  songs: Array as PropType<Song[]>,
});
const containerRef = ref();
const songItemRef = ref();
const { showPlayer } = useAppStore();
const { loadSong } = useSongStore();
const { t } = useI18n();
const setSong = (song: Song) => {
  loadSong(song);
  showPlayer();
};

defineExpose({ containerRef });

onMounted(() => {
  const songItems = Array.from(songItemRef.value, (el: any) => el.container);
  gsap.from(songItems, {
    duration: 0.7,
    ease: "back",
    opacity: 0,
    y: "10px",
    stagger: 0.1,
  });
});
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

.song-item {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &-icon {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(var(--color-primary-600-rgb), 0.4);
  }

  &-thumbnail {
    width: 6rem;
    height: 6rem;
    object-fit: cover;
    border-radius: 1rem;
    overflow: hidden;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    transition: transform 0.1s cubic-bezier(0, 0.55, 0.45, 1);

    &:active {
      transform: scale(0.9);
    }
  }

  &-title {
    flex: 1;
    margin-left: 2rem;
    font-size: 1.6rem;
  }
}
</style>
