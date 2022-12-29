<template>
  <div ref="containerRef" class="player-song">
    <div ref="songThumbnail" class="player-song-thumbnail">
      <Thumbnail :src="picture" alt="song-thumbnail" />
    </div>
    <p ref="songTitle" class="player-song-title text -black">
      {{ song.title }}
      <span
        style="display: block"
        class="text -bold -caption-2 color-black--300"
        >{{ song.description }}</span>
    </p>
    <div class="player-song-action">
      <div ref="infoAction">
        <IconButton
          ref="infoAction"
          aria-label="See song details"
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
import { computed, ref } from "vue";
import type { Song } from "@/domain/Song";
import FavouriteIcon from "@/components/common/FavouriteIcon.vue";
import IconButton from "@/components/component-library/IconButton.vue";
import Thumbnail from "@/components/common/Thumbnail.vue";
import { S3_SOURCE_LINK, S3Dir } from "@/domain/enums/aws-link";

const containerRef = ref();

const props = defineProps({
  song: Object as PropType<Song>,
});

const picture = computed(() =>
  props.song ? S3_SOURCE_LINK(S3Dir.PICTURES, props.song.thumbnail) : ""
);

defineEmits(["viewInformationClick"]);

defineExpose({ containerRef });
</script>
<style lang="scss">
.player-song {
  display: flex;
  align-items: center;
  width: 100%;
}

.player-song-thumbnail {
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  overflow: hidden;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  box-shadow: 0 0.4rem 0.4rem rgba(var(--color-primary-950-rgb), 0.25);
  margin-right: 1.5rem;
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
