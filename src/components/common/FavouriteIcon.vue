<template>
  <IconButton
    type="button"
    icon-name="favourite-outline"
    :aria-label="`add ${props.song.title} to favourite`"
    radius="circle"
    :filled="songStore.isFavourite(props.song.id).value"
    :size="24"
    @click.stop="songStore.addToFavourite(props.song)"
  />
</template>
<script setup lang="ts">
import IconButton from '@/components/component-library/IconButton.vue'
import type { Song } from '@/domain/Song'
import { useSongStore } from '@/stores/song.store'
import type { PropType } from 'vue'

const props = defineProps({
  song: {
    type: Object as PropType<Song>,
    required: true,
  },
})
const songStore = useSongStore()
</script>
