import { computed, ref } from 'vue'

export type Theme = 'dark-theme' | 'light-theme'
export const useTheme = () => {
  const currentTheme = ref<Theme>(
    (localStorage.getItem('theme') as Theme) || 'light-theme',
  )
  const switchTheme = () => {
    if (currentTheme.value === 'light-theme') {
      document.documentElement.className = 'dark-theme'
      currentTheme.value = 'dark-theme'
    } else {
      document.documentElement.className = 'light-theme'
      currentTheme.value = 'light-theme'
    }
    localStorage.setItem('theme', currentTheme.value)
  }
  const themeLabel = computed(() =>
    currentTheme.value === 'dark-theme' ? 'moon' : 'sun',
  )

  const isDarkMode = computed(() => {
    return currentTheme.value === 'dark-theme'
  })

  const setTheme = () => {
    const theme = (localStorage.getItem('theme') as Theme) || 'light-theme'
    document.documentElement.className = theme
    currentTheme.value = theme
  }

  return {
    currentTheme,
    themeLabel,
    switchTheme,
    setTheme,
    isDarkMode,
  }
}
