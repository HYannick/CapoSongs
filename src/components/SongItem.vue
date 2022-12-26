<template>
  <div ref="container" class="song-item">
    <div class="song-item-thumbnail" @click="$emit('selected', song)">
      <div class="song-item-overlay"></div>
      <div class="song-item-icon">
        <Icon name="play" :size="28" />
      </div>
      <Thumbnail :src="picture" :alt="song.title" />
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
import { computed, ref } from "vue";
import type { Song } from "@/domain/Song";
import Thumbnail from "@/components/common/Thumbnail.vue";
import { S3_SOURCE_LINK, S3Dir } from "@/domain/enums/aws-link";

const props = defineProps({
  song: Object as PropType<Song>,
});

const picture = computed(() =>
  props.song ? S3_SOURCE_LINK(S3Dir.PICTURES, props.song.thumbnail) : ""
);

defineEmits(["selected"]);

const container = ref();
defineExpose({ container });
</script>
