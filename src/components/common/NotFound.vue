<template>
  <div class="no-results">
    <Icon name="not-found" :size="iconSize" />
    <h4 class="text -title-3 -bold">{{ title }}</h4>
    <p class="subtitle text -body" v-html="subTitle" @click="showSupport"></p>
  </div>
</template>
<script lang="ts" setup>
import Icon from "@/components/component-library/Icon.vue";
import { useI18n } from "vue-i18n";
import { useAppStore } from "@/stores/app.store";
const { showSupport } = useAppStore();
const { t } = useI18n();

interface Props {
  title?: string;
  subTitle?: string;
  iconSize?: number;
}
withDefaults(defineProps<Props>(), {
  title: "",
  subTitle: "",
  iconSize: 150,
});
</script>

<style lang="scss">
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  path,
  rect,
  line {
    stroke: var(--color-black-200);
  }
  color: var(--color-black-400);
  h4 {
    margin-top: 2.5rem;
  }
  .subtitle {
    text-align: center;
    a {
      color: var(--color-primary-600);
      font-weight: bold;
    }
  }
}
</style>
