<template>
  <IconButton
    type="button"
    icon-name="favourite-outline"
    radius="circle"
    :filled="songStore.isFavourite(props.song.id).value"
    :size="24"
    @click.stop="songStore.addToFavourite(props.song)"
  />
</template>
<script setup lang="ts">
import { useSongStore } from "@/stores/song.store";
import IconButton from "@/components/component-library/IconButton.vue";
import type { PropType } from "vue";
import type { Song } from "@/domain/Song";

const props = defineProps({
  song: Object as PropType<Song>,
});
const songStore = useSongStore();
</script>
