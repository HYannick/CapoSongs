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
      </div>
      <SongList ref="songListEl" :songs="filteredSongs" />
    </div>
    <div class="player">
      <Player v-if="songStore.currentSong" />
      <HomePlaceholder v-else />
    </div>
    <SettingsSidebar :from="SidebarOrigin.RIGHT" />
    <FavouritesSidebar :from="SidebarOrigin.LEFT" />
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
import { useMagicKeys } from "@vueuse/core";
import { useTheme } from "@/composables/useTheme";
import { useKeyboardControls } from "@/composables/useKeyboardControls";

const query = ref("");
const songStore = useSongStore();
const appStore = useAppStore();
const { t } = useI18n();
const headingEl = ref();
const searchEl = ref();
const songListEl = ref();
const el = ref();

const keys = useMagicKeys();
const { switchTheme } = useTheme();

const { app } = useKeyboardControls();
watch(app.settings, (v) => {
  if (v) appStore.toggleSettings();
});

watch(app.favourites, (v) => {
  if (v) appStore.toggleFavouriteSongs();
});

watch(app.darkMode, (v) => {
  if (v) switchTheme();
});

const filteredSongs = computed(() => {
  if (!query.value) {
    return songStore.songs;
  }
  return songStore.songs.filter(
    (song) =>
      song.title.toLowerCase().includes(query.value.toLowerCase()) ||
      song.translation?.toLowerCase().includes(query.value.toLowerCase())
  );
});
// const isLargeScreen = useMediaQuery("(min-width: 1024px)");
// const songList = ref(songStore.songs);
// if (!isLargeScreen.value) {
//   const end = ref(10);
//   songList.value = songStore.songs.slice(0, end.value);
//
//   useInfiniteScroll(
//     el,
//     () => {
//       const start = (end.value += 1);
//       end.value = end.value + 5;
//       songList.value!.push(...filteredSongs.value.slice(start, end.value));
//     },
//     { distance: 5 }
//   );
// }

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
