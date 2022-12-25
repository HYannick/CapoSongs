<template>
  <div class="mentions">
    <div class="mentions-body" ref="mentionContainerRef">
      <h4 class="text -black -title-2">{{ t("mentions.title") }}</h4>
      <h5 class="text -bold">
        {{ t("mentions.musicSources") }}
      </h5>
      <ul>
        <li><a target="_blank" href="https://youtube.com/">Youtube</a></li>
        <li>
          <a target="_blank" href="https://lrcgenerator.com/"
            >[LRC:generator]</a
          >
        </li>
      </ul>
      <h5 class="text -bold">{{ t("mentions.lyricsTrad") }}</h5>
      <ul>
        <li><p class="text -bold color-primary--600">Debbie's notebook</p></li>
        <li><a target="_blank" href="https://lalaue.com/">LaLaue</a></li>
        <li>
          <a target="_blank" href="http://www.capoeira-music.net/"
            >Capoeira Music</a
          >
        </li>
        <li><a target="_blank" href="https://dendearts.com/">dendearts</a></li>
      </ul>
      <h5 class="text -bold">{{ t("mentions.stackLib") }}</h5>
      <ul>
        <li><a target="_blank" href="https://vuejs.org/">Vue</a></li>
        <li>
          <a target="_blank" href="https://github.com/mcanam/liricle">
            Liricles</a
          >
        </li>
      </ul>
      <h5 class="text -bold">{{ t("mentions.appDev") }}</h5>
      <a target="_blank" href="https://github.com/HYannick">Ayho</a>
    </div>
    <div class="mentions-overlay" ref="overlayRef" @click="closeMentions"></div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app.store";
import { onMounted, ref } from "vue";
import gsap from "gsap";
import { useI18n } from "vue-i18n";

const { hideMentions } = useAppStore();
const mentionContainerRef = ref();
const overlayRef = ref();
const { t } = useI18n();
let timeline: any;

const closeMentions = () => {
  timeline.timeScale(2).reverse();
};

onMounted(() => {
  timeline = gsap.timeline({ onReverseComplete: hideMentions });
  timeline
    .from(
      overlayRef.value,
      {
        duration: 0.5,
        ease: "back",
        opacity: 0,
      },
      "-=0.3"
    )
    .from(
      mentionContainerRef.value,
      {
        duration: 0.7,
        ease: "back",
        opacity: 0,
        y: 50,
      },
      "-=0.4"
    );
});
</script>

<style lang="scss">
.mentions {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .mentions-body {
    width: 90vw;
    background: var(--color-background);
    padding: 3rem 1.5rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    z-index: 999;
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
}
.mentions-overlay {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-background);
  opacity: 0.9;
}
</style>
