<template>
  <Modal @onClose="hideShareApp">
    <div class="share-container">
      <h4 class="text -title-2 -black">{{ t("share.title") }}</h4>
      <hr />
      <p class="text -body">
        {{ t("share.heading") }}
      </p>
      <div class="qr-code-container">
        <Icon name="focamu-qrcode" :size="300" />
      </div>
      <div class="share-container">
        <div v-if="isSupported">
          <button @click="copy(source)">
            <!-- by default, `copied` will be reset in 1.5s -->
            <span v-if="!copied">{{ t("share.copy") }}</span>
            <span v-else>{{ t("share.copied") }}</span>
          </button>
        </div>
        <button class="share-app-button" @click="shareApp">Share App</button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app.store";
import { useI18n } from "vue-i18n";
import { useClipboard } from "@vueuse/core";
import Modal from "@/components/common/Modal.vue";
import Icon from "@/components/component-library/Icon.vue";
import { ref } from "vue";

const { hideShareApp } = useAppStore();
const { t } = useI18n();
const source = ref("https://focamu.com");
const { copy, copied, isSupported } = useClipboard({ source });

const shareApp = () => {
  if (navigator.share) {
    navigator.share({
      title: "Focamú",
      text: t("share.action.text"),
      url: "https://focamu.com",
    });
  }
};
</script>

<style lang="scss">
.qr-code-container {
  overflow: hidden;
  border-radius: 2rem;
  align-items: center;
  justify-content: center;
  display: flex;
  background: #ebe7e6;
  width: 30rem;
  height: 30rem;
  margin: 0 auto;
}
.share-container {
  hr {
    margin: 1.5rem 0;
    height: 0.2rem;
    background: rgba(var(--color-primary-950-rgb), 0.1);
    border-radius: 2rem;
    border: none;
  }
  h4 {
    margin-bottom: 0;
  }
  p {
    margin: 1rem 0;
  }
  button {
    background-color: var(--color-background);
    box-shadow: inset 0 0 0 0.2rem var(--color-black-900);
    color: var(--color-black-950);
    border: none;
    font-weight: bold;
    border-radius: 1rem;
    padding: 1.5rem;
    font-size: 1.6rem;
    flex: 1;
    margin-top: 1rem;
    cursor: pointer;
  }

  .share-app-button {
    background-color: var(--color-black-900);
    box-shadow: inset 0 0 0 0.2rem var(--color-black-900);
    color: var(--color-black-50);
  }
}
</style>
