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
      <img class="heading-logo" src="@/assets/img/logo.webp" alt="logo" />
      <div class="text-dot -centered">
        <p class="text -title-1" v-html="t('greetings')"></p>
      </div>
    </div>
    <IconButton
      type="button"
      aria-label="show settings"
      icon-name="settings"
      radius="circle"
      @click="showSettings"
    />
  </header>
</template>

<script setup lang="ts">
import IconButton from "@/components/component-library/IconButton.vue";
import { useAppStore } from "@/stores/app.store";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const containerRef = ref();
const appStore = useAppStore();
const showFavouriteSongs = () => {
  appStore.showFavouriteSongs();
};

const { t } = useI18n();

const showSettings = () => {
  appStore.showSettings();
};

defineExpose({ containerRef });
</script>
<style lang="scss">
.heading-container {
  display: flex;
  justify-content: space-between;
}

.heading-logo {
  width: 6.5rem;
  height: 6.5rem;
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
  margin-left: 0.5rem;
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

@media screen and (min-width: 1024px) {
  .heading-container {
    align-items: center;
    .heading-greetings {
      flex-direction: revert;
      justify-content: flex-start;
    }
    button:first-child {
      order: 1;
    }
    button:last-child {
      order: 2;
    }
  }
}
</style>
