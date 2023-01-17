import { ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";
import type { SongFilters } from "@/domain/enums/SongFilters";

export const useSearchStore = defineStore("search", () => {
  const query = ref("");
  const filters: Ref<SongFilters> = ref({
    genres: [],
    themes: [],
  });
  const currentPage = ref(1);
  const setFilters = (filtersToSet: SongFilters) => {
    filters.value = filtersToSet;
  };
  const updatePage = () => {
    currentPage.value = currentPage.value += 1;
  };

  const resetCurrentPage = () => {
    currentPage.value = 1;
  };

  const resetAllFilters = () => {
    filters.value = {
      genres: [],
      themes: [],
    }
  }
  return {
    query,
    filters,
    setFilters,
    currentPage,
    updatePage,
    resetCurrentPage,
    resetAllFilters
  };
});
