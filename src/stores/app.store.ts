import { useNavigation } from '@/stores/navigation.store'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useAppStore = defineStore('app', () => {
  const featuresVisibility = reactive({
    settings: false,
    support: false,
    mentions: false,
    favouriteSongs: false,
    player: false,
    filters: false,
    shareApp: false,
    cookiesBanner: false,
    notificationsModal: false,
  })

  const { pushState } = useNavigation()

  const closeNotificationsModal = () => {
    featuresVisibility.notificationsModal = false
  }

  const openNotificationsModal = () => {
    featuresVisibility.notificationsModal = true
  }

  const closeCookies = () => {
    featuresVisibility.cookiesBanner = false
  }
  const openCookies = () => {
    featuresVisibility.cookiesBanner = true
  }

  const showShareApp = () => {
    featuresVisibility.shareApp = true
    hideSettings()
  }
  const hideShareApp = () => {
    featuresVisibility.shareApp = false
  }

  const showPlayer = () => {
    featuresVisibility.player = true
    pushState({ player: true })
  }
  const hidePlayer = () => {
    featuresVisibility.player = false
    pushState({ player: false })
  }

  const showFilters = () => {
    featuresVisibility.filters = true
    pushState({ filters: true })
  }
  const hideFilters = () => {
    featuresVisibility.filters = false
    pushState({ filters: false })
  }

  const showMentions = () => {
    featuresVisibility.mentions = true
    hideSettings()
  }
  const hideMentions = () => {
    featuresVisibility.mentions = false
  }

  const showSettings = () => {
    featuresVisibility.settings = true
    pushState({ settings: true })
  }
  const hideSettings = () => {
    featuresVisibility.settings = false
    pushState({ settings: false })
  }

  const showFavouriteSongs = () => {
    featuresVisibility.favouriteSongs = true
    pushState({ favourite: true })
  }
  const hideFavouriteSongs = () => {
    featuresVisibility.favouriteSongs = false
    pushState({ favourite: false })
  }

  const showSupport = () => {
    featuresVisibility.support = true
    hideSettings()
  }
  const hideSupport = () => {
    featuresVisibility.support = false
  }

  const toggleSettings = () => {
    if (!featuresVisibility.settings) {
      showSettings()
    } else {
      hideSettings()
    }
  }
  const toggleFavouriteSongs = () => {
    if (!featuresVisibility.favouriteSongs) {
      showFavouriteSongs()
    } else {
      hideFavouriteSongs()
    }
  }

  return {
    featuresVisibility,
    showSettings,
    hideSettings,
    toggleSettings,
    showFavouriteSongs,
    hideFavouriteSongs,
    toggleFavouriteSongs,
    showMentions,
    hideMentions,
    showSupport,
    hideSupport,
    showPlayer,
    hidePlayer,
    showFilters,
    hideFilters,
    openCookies,
    closeCookies,
    showShareApp,
    hideShareApp,
    openNotificationsModal,
    closeNotificationsModal,
  }
})
