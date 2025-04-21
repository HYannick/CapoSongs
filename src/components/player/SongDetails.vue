<template>
  <BackButton :label="t('common.backPlayer')" @click="$emit('goBack')" />
  <div class="information-body">
    <div class="history" v-if="history">
      <h3 class="text -title-2 -extra-bold">
        {{ t("songDetails.history") }}
      </h3>
      <p class="text -body" v-html="history"></p>
    </div>
    <div class="translation" :class="{ '-extra-padding': !history }">
      <h3 class="text -title-2 -extra-bold">
        {{ t("songDetails.translate") }}
      </h3>
      <template v-if="songTranslation.length">
        <div
          class="translation-line"
          v-for="(line, index) in songTranslation"
          :key="`${line}-${index}`"
        >
          <p class="text -regular -title-3">
            {{ line }}
          </p>
        </div>
      </template>
      <div class="translation-line" v-else>
        <p class="text -regular -body color-black--400">
          {{ t("common.comingSoon") }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import BackButton from '@/components/common/BackButton.vue'
import type { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps({
  history: String,
  songTranslation: {
    type: Array as PropType<string[]>,
    required: true,
  },
})

defineEmits(['goBack'])
</script>

<style lang="scss">
.information-body {
  height: 100vh;
  overflow-y: scroll;
}
.history {
  background: var(--color-primary-200);
  text-align: justify;
  padding: 10rem 2rem 2rem;
  h3 {
    margin-bottom: 2rem;
    text-align: center;
  }
  p {
    padding: 0 2rem;
  }
}
.translation {
  text-align: center;
  padding: 5rem 2rem 10rem;
  &.-extra-padding {
    padding-top: 10rem;
  }
  h3 {
    margin-bottom: 2rem;
  }
  &-line {
    &:nth-child(odd) {
      margin-bottom: 1rem;
      p {
        color: var(--color-primary-600);
      }
    }
  }
}
</style>
