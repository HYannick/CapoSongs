<template>
  <div class="sidebar-bottom" :class="sidebarClasses">
    <div class="sidebar-bottom-content filters">
      <div class="filters-heading">
        <div class="filters-label -center">
          <Icon name="filters" :size="25" />
          <h4 class="text -extra-bold -title-3">
            {{ t("sidebars.filters.title") }}
          </h4>
        </div>
        <div class="filters-heading-actions">
          <IconButton
            aria-label="reset filters"
            icon-name="refresh"
            @click="resetAll"
            class="sidebar-refresh"
            :size="20"
          />
          <IconButton
            aria-label="close filters"
            icon-name="close"
            @click="hideFilters"
            class="sidebar-close"
            :size="24"
          />
        </div>
      </div>
      <hr />
      <div class="filters-body">
        <div class="filters-section">
          <h4 class="text -bold -body">{{t('sidebars.filters.genres.title')}}</h4>
          <div class="input-checkbox-wrapper">
            <InputCheckbox
              v-for="type in songType"
              :key="type"
              name="type"
              type="checkbox"
              :label="t(`sidebars.filters.genres.${type}`)"
              :value="type"
              v-model="filtersToSet.genres"
            />
          </div>
        </div>
        <div class="filters-section">
          <h4 class="text -bold -body">{{t('sidebars.filters.themes.title')}}</h4>
          <div class="input-checkbox-wrapper">
            <InputCheckbox
              v-for="theme in songTheme"
              :key="theme"
              name="theme"
              type="checkbox"
              :label="t(`sidebars.filters.themes.${theme}`)"
              :value="theme"
              v-model="filtersToSet.themes"
            />
          </div>
        </div>
        <button
          aria-label="apply filters"
          class="filters-button"
          :disabled="fetchingSongs"
          @click="applyFilters"
        >
          {{ t("sidebars.filters.apply") }}
        </button>
      </div>
    </div>
    <div class="sidebar-overlay" @click="hideFilters"></div>
  </div>
</template>

<script setup lang="ts">
import { songType } from "@/domain/enums/SongType";
import { useAppStore } from "@/stores/app.store";
import { storeToRefs } from "pinia";
import { computed, onMounted, Ref, ref, watch } from "vue";
import IconButton from "@/components/component-library/IconButton.vue";
import { useI18n } from "vue-i18n";
import Icon from "@/components/component-library/Icon.vue";
import InputCheckbox from "@/components/component-library/InputCheckbox.vue";
import { songTheme } from "@/domain/enums/SongTheme";
import { useSongStore } from "@/stores/song.store";
import { useSearchStore } from "@/stores/search.store";
import type { SongFilters } from "@/domain/enums/SongFilters";
import { useNavigation } from "@/stores/navigation.store";

const { t } = useI18n();
const { filtersVisible } = storeToRefs(useAppStore());
const { hideFilters } = useAppStore();
const songStore = useSongStore();
const { fetchingSongs } = storeToRefs(useSongStore());
const { filters, currentPage } = storeToRefs(useSearchStore());
const { setFilters, resetCurrentPage, resetAllFilters } = useSearchStore();
const filtersToSet: Ref<SongFilters> = ref({
  genres: [],
  themes: [],
});

const sidebarClasses = computed(() => ({
  "-open": filtersVisible.value,
}));

const applyFilters = async () => {
  setFilters({
    genres: filtersToSet.value.genres,
    themes: filtersToSet.value.themes,
  });
  songStore.resetSongs();
  resetCurrentPage();
  await songStore.getSongs(currentPage.value, undefined, {
    genres: filters.value.genres,
    themes: filters.value.themes,
  });
  hideFilters();
};

const resetAll = () => {
  filtersToSet.value = {
    genres: [],
    themes: [],
  };
  resetAllFilters();
  applyFilters();
};
const { state: historyState } = storeToRefs(useNavigation());
watch(
  () => historyState.value.filters,
  (value) => {
    if (!value) hideFilters();
  }
);
watch(
  () => filters.value,
  (filters: SongFilters) => {
    filtersToSet.value = filters;
  },
  { deep: true }
);
</script>

<style lang="scss">
.filters {
  display: flex;
  flex-direction: column;
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

.input-checkbox-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;
}

.filters-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;

  path {
    stroke: var(--color-black-950);
  }

  &-actions {
    display: flex;
    gap: 2rem;
  }
}

.filters-body {
  flex: 1;
}

.filters-section {
  margin-bottom: 2rem;
  h4 {
    margin-bottom: 1rem;
  }
}

.filters-button {
  width: 100%;
  cursor: pointer;
  background: var(--color-black-950);
  color: var(--color-black-50);
  border: none;
  font-weight: bold;
  border-radius: 1rem;
  padding: 1.5rem;
  font-size: 1.6rem;
  transition: background-color 0.5s ease, color 0.5s ease;
  &:disabled {
    background: var(--color-black-200);
    color: var(--color-black-700);
  }
}
</style>
