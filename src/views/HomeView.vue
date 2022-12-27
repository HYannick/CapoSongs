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
    <SettingsSidebar :from="SidebarOrigin.RIGHT" />
    <FavouritesSidebar :from="SidebarOrigin.LEFT" />
    <div class="player">
      <Player v-if="songStore.currentSong" />
      <div class="song-placeholder" v-else>Load some songs bro.</div>
    </div>
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
        background: var(--color-black-50);
        background: linear-gradient(
          180deg,
          rgba(var(--color-black-50-rgb), 0) 0%,
          rgba(var(--color-black-50-rgb), 1) 25%
        );
      }
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
}
</style>
