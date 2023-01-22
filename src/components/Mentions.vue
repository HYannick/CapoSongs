<template>
  <Modal @onClose="hideMentions">
    <div class="mentions-container">
      <h4 class="text -black -title-2">{{ t("mentions.title") }}</h4>
      <h5 class="text -bold">{{ t("mentions.lyricsTrad") }}</h5>
      <ul>
        <li><p class="text -bold color-primary--600">Debbie's notebook</p></li>
        <li>LaLaue</li>
        <li>Capoeira Music</li>
        <li>Dendearts</li>
      </ul>
      <h5 class="text -bold">{{ t("mentions.appDev") }}</h5>
      <a target="_blank" href="https://github.com/HYannick">Ayho</a>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app.store";
import { onMounted, ref } from "vue";
import gsap from "gsap";
import { useI18n } from "vue-i18n";
import Modal from "@/components/common/Modal.vue";

const { hideMentions } = useAppStore();
const { t } = useI18n();
</script>

<style lang="scss">
.mentions-container {
  h4 {
    margin-bottom: 4rem;
  }
  ul {
    padding: 0;
    margin: 1rem 0;
    list-style: none;
  }
  a {
    text-decoration: none;
    color: var(--color-primary-600);
  }
}
</style>