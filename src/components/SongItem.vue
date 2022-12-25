<template>
  <div ref="container" class="song-item">
    <div class="song-item-thumbnail" @click="$emit('selected', song)">
      <div class="song-item-overlay"></div>
      <div class="song-item-icon">
        <Icon name="play" :size="28" />
      </div>
      <Thumbnail :src="song.thumbnail" :alt="song.title" />
    </div>
    <div class="song-item-title" @click="$emit('selected', song)">
      <p class="text -bold">{{ song.title }}</p>
    </div>
    <div class="song-item-action">
      <FavouriteIcon :song="song" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import FavouriteIcon from "@/components/common/FavouriteIcon.vue";
import Icon from "@/components/component-library/Icon.vue";
import type { PropType } from "vue";
import type { Song } from "@/domain/Song";
import { ref } from "vue";
import Thumbnail from "@/components/common/Thumbnail.vue";

defineProps({
  song: Object as PropType<Song>,
});

defineEmits(["selected"]);

const container = ref();
defineExpose({ container });
</script>
