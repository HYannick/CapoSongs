<template>
  <div class="sidebar" :class="sidebarClasses">
    <div class="sidebar-content settings">
      <div class="settings-heading">
        <div class="settings-label -center">
          <Icon name="settings" :size="25" />
          <h4 class="text -extra-bold -title-3">
            {{ t("sidebars.settings.title") }}
          </h4>
        </div>
        <IconButton
          aria-label="close settings"
          icon-name="close"
          @click="hideSettings"
          class="sidebar-close"
          :size="24"
        />
      </div>
      <div class="settings-body">
        <template
          v-if="
            !(appInstalled || appInstallationDismissed) ||
            (isAppleDevice() && !appInstallationDismissed)
          "
        >
          <hr class="pwa-installation-spacer" />
          <div class="pwa-installation-prompt">
            <p class="text -regular -bold" v-html="t('pwaInstall.text')"></p>
            <div class="pwa-installation-footer">
              <button
                aria-label="dismiss pwa install"
                class="dismiss-install"
                @click="closeInstallPrompt"
              >
                {{ t("pwaInstall.dismiss") }}
              </button>
              <button
                aria-label="install pwa"
                class="install-pwa"
                @click="installApp(t('pwaInstall.appleDeviceMessage'))"
              >
                {{ t("pwaInstall.install") }}
              </button>
            </div>
          </div>
        </template>
        <hr />
        <div class="settings-option">
          <div class="settings-label">
            <Icon class="lang" name="lang" :size="20" />
            <p class="text -bold">
              {{ t("sidebars.settings.languages.title") }}
            </p>
          </div>
          <div class="input-radio-wrapper">
            <InputRadio
              name="language"
              value="fr"
              :label="t('sidebars.settings.languages.fr')"
              v-model="$i18n.locale"
            />
            <InputRadio
              name="language"
              value="en"
              :label="t('sidebars.settings.languages.en')"
              v-model="$i18n.locale"
            />
            <!--            TODO: Add Portuguese-->
            <!--            <InputRadio-->
            <!--              name="language"-->
            <!--              value="pt"-->
            <!--              :label="t('sidebars.settings.languages.pt')"-->
            <!--              v-model="$i18n.locale"-->
            <!--            />-->
          </div>
        </div>
        <hr />
        <div class="settings-option">
          <div class="settings-label">
            <Icon class="dark-mode" name="moon" :size="20" />
            <p class="text -bold">{{ t("sidebars.settings.theme") }}</p>
          </div>
          <SwitchInput :checked="isDarkMode" @change="switchTheme" />
        </div>
<!--        //TODO put in in a modal-->
<!--        <div class="keyboard-controls">-->
<!--          <hr />-->
<!--          <div class="settings-label">-->
<!--            <Icon class="command" name="command" :size="20" />-->
<!--            <p class="text -bold">Player controls</p>-->
<!--          </div>-->
<!--          <div-->
<!--            class="keyboard-control"-->
<!--            v-for="(control, key) in playerSheet"-->
<!--            :key="key"-->
<!--          >-->
<!--            <span class="text -body -bold keyboard-key" v-html="key"></span>-->
<!--            <span class="text -body function">{{-->
<!--              t(`sidebars.settings.controls.${control}`)-->
<!--            }}</span>-->
<!--          </div>-->
<!--          <div class="settings-label">-->
<!--            <Icon class="command" name="command" :size="20" />-->
<!--            <p class="text -bold">App controls</p>-->
<!--          </div>-->
<!--          <div-->
<!--            class="keyboard-control"-->
<!--            v-for="(control, key) in appSheet"-->
<!--            :key="key"-->
<!--          >-->
<!--            <span class="text -body -bold keyboard-key">{{ key }}</span>-->
<!--            <span class="text -body function">{{-->
<!--              t(`sidebars.settings.controls.${control}`)-->
<!--            }}</span>-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <div class="settings-footer">
        <button
          aria-label="share the app"
          class="settings-button outline-color-black--900 background-color-black--50 color-black--950"
          @click="showShareApp"
        >
          {{ t("share.button") }}
        </button>
        <button
          aria-label="contact support"
          class="settings-button background-color-primary--600 color-black--50"
          @click="showSupport"
        >
          {{ t("support.button") }}
        </button>
        <button
          aria-label="view special mentions"
          class="settings-button background-color-black--900"
          @click="showMentions"
        >
          {{ t("mentions.button") }}
        </button>
      </div>
    </div>
    <div class="sidebar-overlay" @click="hideSettings"></div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app.store";
import { storeToRefs } from "pinia";
import type { PropType } from "vue";
import { SidebarOrigin } from "@/domain/enums/SideBarOrigin";
import { computed, onMounted, watch } from "vue";
import IconButton from "@/components/component-library/IconButton.vue";
import InputRadio from "@/components/component-library/InputRadio.vue";
import { useTheme } from "@/composables/useTheme";
import { useI18n } from "vue-i18n";
import SwitchInput from "@/components/common/SwitchInput.vue";
import Icon from "@/components/component-library/Icon.vue";
import { usePWAInstallation } from "@/stores/pwa.store";
import { useKeyboardControls } from "@/composables/useKeyboardControls";
import { useNavigation } from "@/stores/navigation.store";

const props = defineProps({
  from: String as PropType<SidebarOrigin>,
});
const { t, locale } = useI18n();
const { settingsVisible } = storeToRefs(useAppStore());
const { hideSettings, showMentions, showSupport, showShareApp } = useAppStore();
const { appInstalled, appInstallationDismissed } = storeToRefs(
  usePWAInstallation()
);

const { isAppleDevice, initInstall, installApp, closeInstallPrompt } =
  usePWAInstallation();
const { isDarkMode, switchTheme } = useTheme();
const { playerSheet, appSheet } = useKeyboardControls();

const sidebarClasses = computed(() => ({
  "-open": settingsVisible.value,
  "sidebar-left": props.from === SidebarOrigin.LEFT,
  "sidebar-right": props.from === SidebarOrigin.RIGHT,
}));

watch(
  () => locale.value,
  (locale) => {
    localStorage.setItem("lang", locale);
  }
);
const { state: historyState } = storeToRefs(useNavigation());
watch(
  () => historyState.value.settings,
  (value) => {
    if (!value) hideSettings();
  }
);

onMounted(() => {
  initInstall();
});
</script>

<style lang="scss">
.settings {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.settings-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  path {
    stroke: var(--color-black-950);
  }
}

.settings-body {
  flex: 1;

  hr {
    margin: 1.5rem 0;
    height: 0.2rem;
    background: rgba(var(--color-primary-950-rgb), 0.1);
    border-radius: 2rem;
    border: none;
    &:first-child {
      margin-top: 0;
    }
  }
}
.keyboard-controls {
  @media screen and (max-width: 1024px) {
    display: none;
  }
  .settings-label {
    margin: 2rem 0;
    .command path {
      stroke: var(--color-black-950);
    }
  }
}
.keyboard-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  .keyboard-key {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 0.2rem rgba(var(--color-primary-950-rgb), 0.3);
    padding: 0.5rem 1.5rem;
    min-width: 4rem;
    border-radius: 0.5rem;
  }
}

.settings-button {
  width: 100%;
  color: var(--color-black-50);
  border: none;
  font-weight: bold;
  border-radius: 1rem;
  padding: 1.5rem;
  font-size: 1.6rem;
}

.settings-label {
  display: flex;
  align-items: center;

  h4 {
    margin-left: 1rem;
  }

  p {
    margin-left: 1rem;
  }
}

.settings-footer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.settings-option {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .lang path {
    fill: var(--color-black-950);
  }

  .dark-mode path {
    stroke: var(--color-black-950);
  }

  .button-container {
    display: flex;
    border-radius: 1rem;
    box-shadow: 0 0 0 0.4rem rgba(var(--color-primary-950-rgb), 0.7);
  }
}

.input-radio-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 0.5;
  justify-content: space-between;

  .input-radio-container:not(:last-child) {
    margin-bottom: 1.5rem;
  }
}

.pwa-installation-footer {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.pwa-installation-spacer {
  @media all and (display-mode: standalone) {
    display: none;
  }
}

.pwa-installation-prompt {
  background: var(--color-secondary-600);
  padding: 1.5rem;
  border-radius: 1rem;

  @media all and (display-mode: standalone) {
    display: none;
  }

  p {
    color: var(--color-primary-300);
  }

  .dismiss-install {
    background: transparent;
    border: transparent;
    color: var(--color-primary-300);
    margin-right: 1rem;
  }

  .install-pwa {
    background: #ffdab9;
    border: transparent;
    color: var(--color-secondary-600);
    padding: 1rem 3rem;
    border-radius: 4rem;
    font-weight: bold;
  }
}
</style>
