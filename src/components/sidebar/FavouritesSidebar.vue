<template>
  <div class="sidebar" :class="sidebarClasses">
    <div ref="contentRef" class="sidebar-content">
      <div class="favourite-song-heading">
        <IconButton icon-name="trash" @click="clearFavourites" :size="24" />
        <h4 class="text -extra-bold -title-3">
          {{ t("sidebars.favourite.title") }}
        </h4>
        <IconButton icon-name="close" @click="hideFavouriteSongs" :size="24" />
      </div>
      <div class="favourite-song-list">
        <NotFound
          v-if="!favouriteSongs.length"
          :title="t('sidebars.favourite.notFound')"
          :sub-title="t('sidebars.favourite.notFoundDetails')"
          :icon-size="100"
        />
        <div
          ref="favouriteSongItemRef"
          class="favourite-song-item"
          v-for="song in favouriteSongs"
          :key="song.id"
          @click="setSong(song)"
        >
          <div class="favourite-song-item-thumbnail">
            <div class="favourite-song-item-icon">
              <Icon name="play" :size="20" />
            </div>
          </div>
          <div class="favourite-song-item-title">
            <p class="text -bold">{{ song.title }}</p>
          </div>
          <div class="favourite-song-item-action">
            <IconButton
              type="button"
              icon-name="remove"
              radius="circle"
              :size="24"
              @click.stop="removeFromFavourite(song.id)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar-overlay" @click="hideFavouriteSongs"></div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app.store";
import { storeToRefs } from "pinia";
import { computed, PropType, ref, watch } from "vue";
import { SidebarOrigin } from "@/domain/enums/SideBarOrigin";
import IconButton from "@/components/component-library/IconButton.vue";
import { useSongStore } from "@/stores/song.store";
import type { Song } from "@/domain/Song";
import Icon from "@/components/component-library/Icon.vue";
import { useI18n } from "vue-i18n";
import gsap from "gsap";
import NotFound from "@/components/common/NotFound.vue";

const props = defineProps({
  from: String as PropType<SidebarOrigin>,
});
const favouriteSongItemRef = ref();
const { favouriteSongsVisible } = storeToRefs(useAppStore());
const { hideFavouriteSongs, showPlayer } = useAppStore();
const { favouriteSongs } = storeToRefs(useSongStore());
const { clearFavourites, loadSong, removeFromFavourite } = useSongStore();
const { t } = useI18n();
const sidebarClasses = computed(() => ({
  "-open": favouriteSongsVisible.value,
  "sidebar-left": props.from === SidebarOrigin.LEFT,
  "sidebar-right": props.from === SidebarOrigin.RIGHT,
}));

const setSong = (song: Song) => {
  loadSong(song);
  hideFavouriteSongs();
  showPlayer();
};

watch(
  () => favouriteSongsVisible.value,
  (value) => {
    if (value) {
      gsap.fromTo(
        favouriteSongItemRef.value,
        {
          opacity: 0,
          x: "-5px",
        },
        {
          delay: 0.3,
          duration: 0.7,
          ease: "back",
          opacity: 1,
          x: "0",
          stagger: 0.05,
        }
      );
    } else {
      gsap.fromTo(
        favouriteSongItemRef.value,
        {
          opacity: 1,
          x: "0",
        },
        {
          delay: 0.3,
          duration: 0.7,
          ease: "back",
          opacity: 0,
          x: "-5px",
          stagger: 0.05,
        }
      );
    }
  }
);
</script>

<style lang="scss">
.favourite-song-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  h4 {
    flex: 1;
    text-align: center;
  }
}

.favourite-song-item-thumbnail {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  box-shadow: 0 0.5rem 0.4rem rgba(#929292, 0.3);
  border-radius: 1rem;
  background: transparent;
}
.favourite-song-item-icon {
  display: flex;
  path {
    stroke: var(--color-black-950);
  }
}
.favourite-song-item-action {
  .icon-button .icon path {
    stroke: var(--color-system-pink);
  }
}

.favourite-song-item-title {
  flex: 1;
}
.favourite-song-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.favourite-song-item-thumbnail {
  margin-right: 1.5rem;
}
</style>
