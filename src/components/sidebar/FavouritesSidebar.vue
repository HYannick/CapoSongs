<template>
  <div class="sidebar" :class="sidebarClasses">
    <div ref="contentRef" class="sidebar-content">
      <div class="favourite-song-heading">
        <IconButton
          aria-label="clear favourites"
          icon-name="trash"
          @click="clearFavourites"
          :size="24"
        />
        <h4 class="text -extra-bold -title-3">
          {{ t("sidebars.favourite.title") }}
        </h4>
        <IconButton
          aria-label="close favourite sidebar"
          icon-name="close"
          class="sidebar-close"
          @click="hideFavouriteSongs"
          :size="24"
        />
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
              :aria-label="`remove ${song.title} from favourites`"
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
import NotFound from '@/components/common/NotFound.vue'
import Icon from '@/components/component-library/Icon.vue'
import IconButton from '@/components/component-library/IconButton.vue'
import type { Song } from '@/domain/Song'
import { SidebarOrigin } from '@/domain/enums/SideBarOrigin'
import { useAppStore } from '@/stores/app.store'
import { useNavigation } from '@/stores/navigation.store'
import { useSongStore } from '@/stores/song.store'
import gsap from 'gsap'
import { storeToRefs } from 'pinia'
import { type PropType, computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  from: String as PropType<SidebarOrigin>,
})
const favouriteSongItemRef = ref()
const { featuresVisibility } = storeToRefs(useAppStore())
const { hideFavouriteSongs, showPlayer } = useAppStore()
const { favouriteSongs } = storeToRefs(useSongStore())
const { clearFavourites, loadSong, removeFromFavourite } = useSongStore()
const { t } = useI18n()
const sidebarClasses = computed(() => ({
  '-open': featuresVisibility.value.favouriteSongs,
  'sidebar-left': props.from === SidebarOrigin.LEFT,
  'sidebar-right': props.from === SidebarOrigin.RIGHT,
}))

const setSong = (song: Song) => {
  loadSong(song)
  hideFavouriteSongs()
  showPlayer()
}

const { state: historyState } = storeToRefs(useNavigation())
watch(
  () => historyState.value.favourite,
  (value) => {
    if (!value) hideFavouriteSongs()
  },
)

watch(
  () => featuresVisibility.value.favouriteSongs,
  (value) => {
    if (value) {
      gsap.fromTo(
        favouriteSongItemRef.value,
        {
          opacity: 0,
          x: '-5px',
        },
        {
          delay: 0.3,
          duration: 0.7,
          ease: 'back',
          opacity: 1,
          x: '0',
          stagger: 0.05,
        },
      )
    } else {
      gsap.fromTo(
        favouriteSongItemRef.value,
        {
          opacity: 1,
          x: '0',
        },
        {
          delay: 0.3,
          duration: 0.7,
          ease: 'back',
          opacity: 0,
          x: '-5px',
          stagger: 0.05,
        },
      )
    }
  },
)
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
  border: 0.2rem solid var(--color-black-200);
  border-radius: 1rem;
  background: transparent;
  margin-right: 1rem;
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
  margin-bottom: 1rem;
}
</style>
