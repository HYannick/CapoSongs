<template>
  <div ref="containerRef" class="player-song">
    <div ref="songThumbnail" class="player-song-thumbnail">
      <Thumbnail :src="song.thumbnail" alt="song-thumbnail" />
    </div>
    <p ref="songTitle" class="player-song-title text -black">
      {{ song.title }}
    </p>
    <div class="player-song-action">
      <div ref="infoAction">
        <IconButton
          ref="infoAction"
          v-if="song.translation || song.history"
          type="button"
          icon-name="circle-info"
          radius="circle"
          :size="24"
          @click="$emit('viewInformationClick')"
        />
      </div>
      <div ref="favouriteAction">
        <FavouriteIcon :song="song" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { Song } from "@/domain/Song";
import FavouriteIcon from "@/components/common/FavouriteIcon.vue";
import IconButton from "@/components/component-library/IconButton.vue";
import { ref } from "vue";
import Thumbnail from "@/components/common/Thumbnail.vue";
const containerRef = ref();

defineProps({
  song: Object as PropType<Song>,
});

defineEmits(["viewInformationClick"]);

defineExpose({ containerRef });
</script>
<style lang="scss">
.player-song-thumbnail {
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0.4rem 0.4rem rgba(var(--color-primary-950-rgb), 0.25);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.player-song-title {
  flex: 1;
}

.player-song-action {
  display: flex;
  align-items: center;

  .icon-wrapper {
    path {
      stroke: var(--color-black-950);
      stroke-width: 2.5;
    }
  }
}
</style>
