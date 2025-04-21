<template>
  <div ref="container" class="song-item" @click="$emit('selected', song)">
    <div class="song-item-thumbnail">
      <div class="song-item-overlay"></div>
      <div class="song-item-icon">
        <Icon name="play" :size="28" />
      </div>
      <Thumbnail :src="picture" :alt="song.title" />
    </div>
    <div class="song-item-title">
      <p class="text -bold">
        <span class="title-asset">{{ song.title }}</span>
        <span
          style="display: block"
          class="text -bold -caption-2 color-black--300"
          >{{ song.description || t("common.unknownArtist") }}</span
        >
      </p>
    </div>
    <div class="song-item-action">
      <FavouriteIcon :song="song" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import FavouriteIcon from '@/components/common/FavouriteIcon.vue'
import Thumbnail from '@/components/common/Thumbnail.vue'
import Icon from '@/components/component-library/Icon.vue'
import type { Song } from '@/domain/Song'
import { S3Dir, S3_SOURCE_LINK } from '@/domain/enums/aws-link'
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

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

defineEmits(['selected'])

const container = ref()
defineExpose({ container, id: props.song!.id })
</script>
<style lang="scss">
.song-item {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  cursor: pointer;
  opacity: 1;

  &:last-child {
    margin-bottom: 0;
  }

  &-icon {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(var(--color-primary-600-rgb), 0.4);
  }

  &-thumbnail {
    width: 6rem;
    height: 6rem;
    object-fit: cover;
    border-radius: 1rem;
    overflow: hidden;
    mask-image: linear-gradient(white, black);
    -webkit-mask-image: -webkit-linear-gradient(white, black);
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    transition: transform 0.1s cubic-bezier(0, 0.55, 0.45, 1);

    &:active {
      transform: scale(0.9);
    }
  }

  &-title {
    flex: 1;
    margin-left: 1rem;
    font-size: 1.6rem;
  }
}
</style>
