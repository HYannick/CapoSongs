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
          :size="24"
        />
      </div>
      <div class="settings-body">
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
            <InputRadio
              name="language"
              value="pt"
              :label="t('sidebars.settings.languages.pt')"
              v-model="$i18n.locale"
            />
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
      </div>
      <div class="settings-footer">
        <button v-if="!appInstalled" @click="installApp">Install</button>
        user res: {{ userRes }}
        p {{deferredPrompt}}
        <button
          aria-label="view special mentions"
          class="mentions-button"
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
import { computed, onMounted, ref, watch } from "vue";
import IconButton from "@/components/component-library/IconButton.vue";
import InputRadio from "@/components/component-library/InputRadio.vue";
import { useTheme } from "@/composables/useTheme";
import { useI18n } from "vue-i18n";
import SwitchInput from "@/components/common/SwitchInput.vue";
import Icon from "@/components/component-library/Icon.vue";

const props = defineProps({
  from: String as PropType<SidebarOrigin>,
});

const { t, locale } = useI18n();
const { settingsVisible } = storeToRefs(useAppStore());
const { hideSettings, showMentions } = useAppStore();
const { isDarkMode, switchTheme } = useTheme();
const deferredPrompt = ref();
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

const appInstalled = ref(false);
const userRes = ref("");
const installApp = async () => {
  alert(deferredPrompt.value)
  // Hide the app provided install promotion
  // Show the install prompt
  deferredPrompt.value.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.value.userChoice;
  alert(outcome)
  // Optionally, send analytics event with outcome of user choice
  userRes.value = `User response to the install prompt: ${outcome}`;
  console.log(`User response to the install prompt: ${outcome}`);
  // We've used the prompt, and can't use it again, throw it away
  deferredPrompt.value = null;
};


onMounted(() => {
  window.addEventListener("beforeinstallprompt", (e) => {
    // Stash the event so it can be triggered later.
    deferredPrompt.value = e;
    // Update UI notify the user they can install the PWA
    // Optionally, send analytics event that PWA install promo was shown.
    console.log(`'beforeinstallprompt' event was fired.`);
  });
  window.addEventListener("appinstalled", () => {
    // Hide the app-provided install promotion
    // Clear the deferredPrompt so it can be garbage collected
    appInstalled.value = true;
    // Optionally, send analytics event to indicate successful install
    console.log("PWA was installed");
  });
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
    stroke: var(--color-primary-950);
  }
}

.settings-body {
  flex: 1;
  hr {
    margin-bottom: 2rem;
    height: 0.2rem;
    background: rgba(var(--color-primary-950-rgb), 0.1);
    border-radius: 2rem;
    border: none;
  }
}
.mentions-button {
  width: 100%;
  background: var(--color-black-950);
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
.settings-option {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .lang path {
    fill: var(--color-primary-950);
  }
  .dark-mode path {
    stroke: var(--color-primary-950);
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
</style>
