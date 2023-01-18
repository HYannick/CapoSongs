<template>
  <main ref="el">
    <div class="main-container">
      <Heading ref="headingEl" />
      <div ref="searchEl" class="search-container">
        <InputField
          name="query"
          type="text"
          :placeholder="t('search.placeholder')"
          v-model="query"
          icon="search"
        />
        <div class="search-filters-container" v-if="mergedFilters.length">
          <div
            class="search-filters-item"
            v-for="filter in mergedFilters"
            :key="filter"
          >
            <span class="text -caption-1 -bold">{{
              t(`search.filters.${filter}`)
            }}</span>
          </div>
          <IconButton
            class="reset-button"
            icon-name="refresh"
            @click="resetAll"
            size="15"
          />
        </div>
      </div>
      <SongList ref="songListEl" :songs="songStore.songs" />
    </div>
    <div class="player">
      <Player v-if="songStore.currentSong" />
      <HomePlaceholder v-else />
    </div>
    <SettingsSidebar :from="SidebarOrigin.RIGHT" />
    <FavouritesSidebar :from="SidebarOrigin.LEFT" />
    <FiltersSidebar />
    <Mentions v-if="appStore.mentionsVisible" />
  </main>
</template>

<script setup lang="ts">
import Heading from "@/components/common/Heading.vue";
import SettingsSidebar from "@/components/sidebar/SettingsSidebar.vue";
import FavouritesSidebar from "@/components/sidebar/FavouritesSidebar.vue";
import Player from "@/components/player/Player.vue";
import { SidebarOrigin } from "@/domain/enums/SideBarOrigin";
import { computed, onMounted, ref, watch } from "vue";
import InputField from "@/components/component-library/InputField.vue";
import SongList from "@/components/SongList.vue";
import { useSongStore } from "@/stores/song.store";
import { useI18n } from "vue-i18n";
import gsap from "gsap";
import { useAppStore } from "@/stores/app.store";
import Mentions from "@/components/Mentions.vue";
import HomePlaceholder from "@/components/HomePlaceholder.vue";
import {
  useDebounce,
  useInfiniteScroll,
  useMagicKeys,
  useMediaQuery,
} from "@vueuse/core";
import { useTheme } from "@/composables/useTheme";
import { useKeyboardControls } from "@/composables/useKeyboardControls";
import FiltersSidebar from "@/components/sidebar/FiltersSidebar.vue";
import { useSearchStore } from "@/stores/search.store";
import { storeToRefs } from "pinia";
import IconButton from "@/components/component-library/IconButton.vue";
import { useNavigation } from "@/stores/navigation.store";

const songStore = useSongStore();
const appStore = useAppStore();
const { initHistoryState } = useNavigation();
const { updatePage, resetCurrentPage, resetAllFilters } = useSearchStore();
const { query, filters, currentPage } = storeToRefs(useSearchStore());
const { t } = useI18n();
const headingEl = ref();
const searchEl = ref();
const songListEl = ref();
const el = ref();
const keys = useMagicKeys();
const { switchTheme } = useTheme();
const debounced = useDebounce(query, 500);

const { app } = useKeyboardControls();

const mergedFilters = computed(() => {
  return [...filters.value.genres, ...filters.value.themes];
});

const fetchMoreSongs = () => {
  if (currentPage.value <= songStore.pageCount) {
    updatePage();
    songStore.loadMoreSongs(currentPage.value, query.value, filters.value);
  }
  // songItemRefs.value = Array.from(songItemRef.value) as SongItemRef[];
  // if (currentSong.value) animateOnSongSelected(currentSong.value);
};
const isLargeScreen = useMediaQuery("(min-width: 1024px)");
if (!isLargeScreen.value) {
  useInfiniteScroll(el, fetchMoreSongs, {
    distance: 10,
  });
}

const applyFilters = async () => {
  songStore.resetSongs();
  resetCurrentPage();
  await songStore.getSongs(currentPage.value, undefined, {
    genres: filters.value.genres,
    themes: filters.value.themes,
  });
};

const resetAll = () => {
  resetAllFilters();
  applyFilters();
};

watch(app.settings, (v) => {
  if (v) appStore.toggleSettings();
});

watch(app.favourites, (v) => {
  if (v) appStore.toggleFavouriteSongs();
});

watch(app.darkMode, (v) => {
  if (v) switchTheme();
});

watch(
  () => debounced.value,
  (searchQuery) => {
    resetCurrentPage();
    songStore.resetSongs();
    songStore.getSongs(currentPage.value, searchQuery);
  }
);
watch(
  () => appStore.playerVisible,
  (visible) => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "initial";
    }
  }
);

onMounted(async () => {
  initHistoryState();
  await songStore.setFavouriteSongs();
  const t1 = gsap.timeline();
  t1.from(headingEl.value.containerRef, {
    duration: 0.7,
    ease: "back",
    opacity: 0,
    y: "10px",
  })
    .from(
      searchEl.value,
      {
        duration: 0.7,
        ease: "back",
        opacity: 0,
        y: "10px",
      },
      "-=0.45"
    )
    .from(
      songListEl.value.containerRef,
      {
        opacity: 0,
        y: "10px",
        ease: "back",
      },
      "-=0.55"
    );
});
</script>
<style lang="scss">
.search-container {
  margin-top: 3rem;
  margin-bottom: 4rem;
}

.search-filters {
  &-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
    .icon-button.reset-button {
      padding: 0.5rem;
      box-shadow: 0 0 0 0.2rem var(--color-primary-600);
      background-color: var(--color-primary-600);
      path {
        stroke: var(--color-black-900);
      }
      border-radius: 1rem;
    }
  }
  &-item {
    padding: 0 1rem;
    border-radius: 1rem;
    box-shadow: 0 0 0 0.2rem var(--color-black-200);
    color: var(--color-black-900);
  }
}

.main-container {
  padding: 1.5rem;
}

main {
  overflow-y: scroll;
  height: 100vh;
  @media screen and (min-width: 1024px) {
    overflow: initial;
    height: initial;
    #query {
      font-size: 1.4rem;
    }
    display: flex;
    .main-container {
      flex: 0.25;
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 9;
      border-right: 0.1rem solid var(--color-black-100);
    }
  }
}
</style>
