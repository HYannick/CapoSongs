<template>
  <main>
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
      <div class="song-placeholder" v-else>Load some songs bro.</div>
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

const query = ref("");
const songStore = useSongStore();
const appStore = useAppStore();
const { t } = useI18n();

const headingEl = ref();
const searchEl = ref();
const songListEl = ref();
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
  .song-placeholder {
    display: none;
  }
  @media screen and (min-width: 1024px) {
    #query {
      font-size: 1.4rem;
    }
    display: flex;
    .song-placeholder {
      display: flex;
    }
    .main-container {
      flex: 0.25;
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 9;
    }
  }
}
</style>
