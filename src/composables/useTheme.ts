import { computed, ref } from "vue";

export const useTheme = () => {
  const currentTheme = ref<"dark-theme" | "light-theme">("light-theme");
  const switchTheme = () => {
    if (currentTheme.value === "light-theme") {
      document.documentElement.className = "dark-theme";
      currentTheme.value = "dark-theme";
    } else {
      document.documentElement.className = "light-theme";
      currentTheme.value = "light-theme";
    }
  };
  const themeLabel = computed(() =>
    currentTheme.value === "dark-theme" ? "sun" : "moon"
  );

  return {
    themeLabel,
    switchTheme,
  };
};
