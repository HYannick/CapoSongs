<template>
  <header ref="containerRef" class="heading-container">
    <IconButton
      type="button"
      aria-label="show favourite songs"
      icon-name="favourite-outline"
      radius="circle"
      @click="showFavouriteSongs"
    />
    <div class="heading-greetings">
      <Icon class="heading-logo" :size="200" name="logo" />
      <div class="heading-greetings-desktop">
        <span>Capoeria</span>
        <span>Songs</span>
      </div>
    </div>
    <LucideBolt
      class="icon-button"
      :size="32"
      @click="showSettings"
    />
  </header>
</template>

<script setup lang="ts">
import Icon from '@/components/component-library/Icon.vue'
import { useAppStore } from '@/stores/app.store'
import { ref } from 'vue'
import {LucideBolt} from 'lucide-vue-next'
import IconButton from "@/components/component-library/IconButton.vue";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
const containerRef = ref()
const appStore = useAppStore()

const triggerHaptics = async () => {
  return Haptics.impact({ style: ImpactStyle.Medium });
}
const showFavouriteSongs = () => {
  triggerHaptics();
  appStore.showFavouriteSongs()
}

const showSettings = () => {
  triggerHaptics();
  appStore.showSettings()
}

defineExpose({ containerRef })
</script>
<style lang="scss">
.heading-container {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.heading-logo {
  width: 6.5rem;
  height: 6.5rem;
  .logo-outline {
    fill: var(--color-logo-outline);
  }
  .logo-inline {
    fill: var(--color-logo-inline);
  }
  path {
    fill: var(--color-logo-path);
  }
}

.text-dot {
  position: relative;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 0.6rem;
    height: 0.6rem;
    background: var(--color-primary-600);
    border-radius: 1rem;
  }
  &.-left {
    &:after {
      left: 0.2rem;
    }
  }
  &.-right {
    &:after {
      right: 0.2rem;
    }
  }
  &.-centered {
    &:after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
}

.heading-greetings {
  flex: 1;
  position: relative;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  span {
    font-size: 3.2rem;
    &:last-child {
      margin-right: 0;
    }
  }
}
.heading-greetings-desktop {
  display: none;
}
@media screen and (min-width: 1024px) {
  .heading-greetings-desktop {
    display: block;
    span {
      display: block;
      line-height: 1;
      font-size: 1.3rem;
      color: var(--color-black-900);
      font-family: var(--text-font-black), sans-serif;
      &:last-child {
        font-family: var(--text-font-light), sans-serif;
      }
    }
  }
  .heading-container {
    align-items: center;
    .icon-button {
      svg {
        width: 2.5rem;
        height: 2.5rem;
      }
    }
    .heading-greetings {
      flex-direction: revert;
      justify-content: flex-start;
      .text-dot {
        display: none;
      }
    }
    button:first-child {
      order: 1;
      margin-right: 2rem;
    }
    button:last-child {
      order: 2;
    }
  }
}
</style>
