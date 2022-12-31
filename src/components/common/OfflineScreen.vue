<template>
  <div class="offline-screen">
    <Icon name="offline" size="250" />
    <div class="offline-text">
      <p class="text -bold -large-body">
        {{ t("offlineScreen.title") }}
      </p>
      <p class="text" v-html="t('offlineScreen.description')"></p>
      <button class="offline-retry-button" @click="reloadPage">
        <span class="text -bold -body">{{ t("offlineScreen.button") }}</span>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Icon from "@/components/component-library/Icon.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const reloadPage = () => {
  window.location.reload();
};
</script>
