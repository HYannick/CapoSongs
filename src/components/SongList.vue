<template>
  <div ref="containerRef" class="song-list-container">
    <div class="song-list-heading">
      <h2
        class="text-dot -left text -extra-bold"
        v-html="t('songList.title')"
      ></h2>
      <LucideListFilter
        icon-name="filters"
        :size="32"
        @click="showFilters"
      ></LucideListFilter>
    </div>
    <ListLoader v-if="fetchingSongs" :title="t('songList.loading')" />
    <ListError
      v-else-if="songFetchError"
      :title="t('songList.error.title')"
      :sub-title="t('songList.error.message')"
    />
    <NotFound
      v-else-if="songsNotFound"
      :title="t('songList.notFound.title')"
      :sub-title="t('songList.notFound.message')"
    />
    <div v-else ref="el" class="song-list">
      <SongItem
        ref="songItemRef"
        v-for="song in songs"
        :song="song"
        :key="song.id"
        @selected="setSong"
      />
    </div>
    <ListLoader small v-if="isLoadingMoreSongs" />
  </div>
</template>

<script setup lang="ts">
import SongItem from '@/components/SongItem.vue'
import ListError from '@/components/common/ListError.vue'
import ListLoader from '@/components/common/ListLoader.vue'
import NotFound from '@/components/common/NotFound.vue'
import type { Song } from '@/domain/Song'
import type { SongItemRef } from '@/domain/SongItem'
import { useAppStore } from '@/stores/app.store'
import { useNotificationStore } from '@/stores/notification.store'
import { useSearchStore } from '@/stores/search.store'
import { useSongStore } from '@/stores/song.store'
import { useInfiniteScroll, useMediaQuery } from '@vueuse/core'
import gsap from 'gsap'
import { storeToRefs } from 'pinia'
import { type Ref, onMounted } from 'vue'
import { computed, nextTick, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { LucideListFilter } from "lucide-vue-next";
import { useHapticsFeedback } from "@/composables/useHapticsFeedback.ts";
import { useTracking } from "@/composables/useTracking.ts";


const containerRef = ref()
const songItemRef = ref()
const el = ref<HTMLElement>()
const songItemRefs: Ref<SongItemRef[]> = ref([])
const { showPlayer } = useAppStore()
const { currentSong, fetchingSongs, isLoadingMoreSongs, songs, pageCount } =
  storeToRefs(useSongStore())
const { loadSong, loadMoreSongs, getSongs } = useSongStore()
const { currentPage, query, filters } = storeToRefs(useSearchStore())
const { updatePage } = useSearchStore()
const { showFilters } = useAppStore()
const { notify } = useNotificationStore()
const { triggerHaptics } = useHapticsFeedback();
const {trackSongClicked} = useTracking();
const { t } = useI18n()

const songFetchError = ref(false)
const songsNotFound = computed(
  () => !songs.value.length && !fetchingSongs.value,
)

onMounted(async () => {
  await getSongs().catch(() => {
    notify('popups.errors.songFetch', 'error')
    songFetchError.value = true
    fetchingSongs.value = false
  })
})

const fetchMoreSongs = () => {
  if (currentPage.value <= pageCount.value) {
    updatePage()
    loadMoreSongs(currentPage.value, query.value, filters.value)
  }
  songItemRefs.value = Array.from(songItemRef.value) as SongItemRef[]
  if (currentSong.value) animateOnSongSelected(currentSong.value)
}
const isLargeScreen = useMediaQuery('(min-width: 1024px)')
if (isLargeScreen.value) {
  useInfiniteScroll(el, fetchMoreSongs, {
    distance: 10,
  })
}

const opacity = (opacity: number) => ({
  duration: 0.3,
  opacity,
})

const setSong = (song: Song) => {
  trackSongClicked(song);
  triggerHaptics();
  loadSong(song)
  showPlayer()
}

const animateOnSongSelected = (song: Song) => {
  const currentSongItem = songItemRefs.value.find((el) => el.id === song.id)
  if (!currentSongItem) return
  const songItems = songItemRefs.value
    .filter((el) => el.id !== currentSongItem!.id)
    .map((el) => el.container)

  if (currentSongItem) {
    gsap.fromTo(currentSongItem.container, opacity(0.4), opacity(1))
    gsap.to(songItems, opacity(0.4))
  } else {
    gsap.to(songItems, opacity(1))
  }
}
const fadeInAllSongItems = () => {
  gsap.to(
    songItemRefs.value.map((el) => el.container),
    {
      duration: 0.7,
      opacity: 1,
    },
  )
}
const staggerShowAllSongItems = () => {
  gsap.from(
    songItemRefs.value.map((el) => el.container),
    {
      duration: 0.7,
      ease: 'back',
      opacity: 0,
      y: '10px',
      stagger: 0.1,
    },
  )
}

watch(
  () => currentSong.value,
  (song) => {
    if (!isLargeScreen.value) return
    if (!song) {
      fadeInAllSongItems()
      return
    }
    animateOnSongSelected(song)
  },
)

watch(
  () => fetchingSongs.value,
  async () => {
    await nextTick()
    if (!songItemRef.value) return
    songItemRefs.value = Array.from(songItemRef.value) as SongItemRef[]
    staggerShowAllSongItems()
  },
)

defineExpose({ containerRef })
</script>

<style lang="scss">
.song-list-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
      bottom: 0;
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
