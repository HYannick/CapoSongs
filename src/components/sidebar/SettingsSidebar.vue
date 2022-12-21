<template>
  <div class="sidebar" :class="sidebarClasses">
    <div class="sidebar-content">
      <div class="settings-heading">
        <h4 class="text -extra-bold -title-3">
          {{ t("sidebars.settings.title") }}
        </h4>
        <IconButton icon-name="close" @click="hideSettings" :size="24" />
      </div>
      <div class="settings-body">
        <hr />
        <div class="settings-option">
          <p class="text -bold">{{ t("sidebars.settings.languages.title") }}</p>
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
          <p class="text -bold">{{ t("sidebars.settings.theme") }}</p>
          <div class="button-container">
            <IconButton
              v-if="themeLabel === 'moon'"
              icon-name="sun"
              @click="switchTheme"
            />
            <IconButton v-else icon-name="moon" @click="switchTheme" />
          </div>
        </div>
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
import { computed } from "vue";
import IconButton from "@/components/component-library/IconButton.vue";
import InputRadio from "@/components/component-library/InputRadio.vue";
import { useTheme } from "@/composables/useTheme";
import { useI18n } from "vue-i18n";

const props = defineProps({
  from: String as PropType<SidebarOrigin>,
});
const { t } = useI18n();
const { settingsVisible } = storeToRefs(useAppStore());
const { hideSettings } = useAppStore();
const { themeLabel, switchTheme } = useTheme();
const sidebarClasses = computed(() => ({
  "-open": settingsVisible.value,
  "sidebar-left": props.from === SidebarOrigin.LEFT,
  "sidebar-right": props.from === SidebarOrigin.RIGHT,
}));
</script>

<style lang="scss">
.settings-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.settings-body {
  hr {
    margin-bottom: 2rem;
    height: 0.2rem;
    background: rgba(var(--color-primary-950-rgb), 0.1);
    border-radius: 2rem;
    border: none;
  }
}

.settings-option {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  p {
    margin-bottom: 1rem;
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
  gap: 1rem;
  flex: 0.5;
  justify-content: space-between;
}

.temporary-theme-button {
  border: transparent;
  background: var(--color-black-900);
  color: var(--color-black-50);
  font-family: var(--text-font-extra-bold);
  border-radius: 10rem;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-appearance: none;
  box-shadow: 0 0 0 0.4rem rgba(var(--color-primary-950-rgb), 0.7);
}
</style>
