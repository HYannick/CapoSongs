<template>
  <div class="song-list">
    <div class="song-list-heading">
      <h2 class="text-dot -left text -extra-bold">
        <span class="color-secondary--600">C</span>anções
      </h2>
    </div>
    <div
      class="no-results"
      v-if="!songs.length">
      {{ t("common.notFound") }}
    </div>
    <div class="song-item" v-for="song in songs" :key="song.id">
      <div class="song-item-thumbnail" @click="setSong(song)">
        <div class="song-item-overlay"></div>
        <div class="song-item-icon">
          <icon name="play" :size="28" />
        </div>
        <img :src="song.thumbnail" :alt="song.title" />
      </div>
      <div class="song-item-title">
        <p class="text -bold">{{ song.title }}</p>
      </div>
      <div class="song-item-action">
        <FavouriteIcon :song="song" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { Song } from "@/domain/Song";
import { useAppStore } from "@/stores/app.store";
import Icon from "@/components/component-library/Icon.vue";
import FavouriteIcon from "@/components/FavouriteIcon.vue";
import { useSongStore } from "@/stores/song.store";
import { useI18n } from "vue-i18n";

defineProps({
  songs: Array as PropType<Song[]>,
});

const { showPlayer } = useAppStore();
const { loadSong } = useSongStore();
const { t } = useI18n();
const setSong = (song: Song) => {
  loadSong(song);
  showPlayer();
};
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
