<template>
  <div ref="containerRef" class="player-song">
    <div ref="songThumbnail" class="player-song-thumbnail">
      <Thumbnail :src="picture" alt="song-thumbnail" />
    </div>
    <p ref="songTitle" class="player-song-title text -black">
      <span class="title-wrapper">{{ song.title }}</span>
      <span
        style="display: block"
        class="text -bold -caption-2 color-black--300"
        >{{ song.description }}</span
      >
    </p>
    <div class="player-song-action">
      <div
        ref="infoAction"
        :data-title="t('onboarding.player.step2.title')"
        :data-intro="t('onboarding.player.step2.text')"
      >
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
import FavouriteIcon from '@/components/common/FavouriteIcon.vue'
import Thumbnail from '@/components/common/Thumbnail.vue'
import IconButton from '@/components/component-library/IconButton.vue'
import type { Song } from '@/domain/Song'
import { S3Dir, S3_SOURCE_LINK } from '@/domain/enums/aws-link'
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const containerRef = ref()

const { t } = useI18n()

const props = defineProps({
  song: {
    type: Object as PropType<Song>,
    required: true,
  },
})

const picture = computed(() =>
  props.song ? S3_SOURCE_LINK(S3Dir.PICTURES, props.song.thumbnail) : '',
)

defineEmits(['viewInformationClick'])

defineExpose({ containerRef })
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
  mask-image: linear-gradient(white, black);
  -webkit-mask-image: -webkit-linear-gradient(white, black);
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
  .title-wrapper {
    @media only screen and (max-device-width: 1024px) {
      white-space: nowrap;
      overflow: hidden;
      max-width: 12rem;
      width: 100%;
      display: block;
      text-overflow: ellipsis;
    }
  }
}

.player-song-action {
  display: flex;
  align-items: center;

  > div {
    margin-left: 1.5rem;
  }

  .icon-wrapper {
    path {
      stroke: var(--color-black-950);
      stroke-width: 2.5;
    }
  }
}
</style>
