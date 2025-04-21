import { useAppStore } from '@/stores/app.store'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const useNavigationMock = {
  pushState: vi.fn(),
}

vi.mock('@/stores/navigation.store', () => ({
  useNavigation: () => useNavigationMock,
}))

describe('App Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
  })

  it('should show/hide settings', () => {
    const appStore = useAppStore()
    expect(appStore.featuresVisibility.settings).toBeFalsy()
    appStore.showSettings()
    expect(appStore.featuresVisibility.settings).toBeTruthy()
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({
      settings: true,
    })
    appStore.hideSettings()
    expect(appStore.featuresVisibility.settings).toBeFalsy()
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({
      settings: false,
    })
  })

  it('should show/hide favourite songs', () => {
    const appStore = useAppStore()
    expect(appStore.featuresVisibility.favouriteSongs).toBeFalsy()
    appStore.showFavouriteSongs()
    expect(appStore.featuresVisibility.favouriteSongs).toBeTruthy()
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({
      favourite: true,
    })
    appStore.hideFavouriteSongs()
    expect(appStore.featuresVisibility.favouriteSongs).toBeFalsy()
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({
      favourite: false,
    })
  })

  it('should show/hide player', () => {
    const appStore = useAppStore()
    expect(appStore.featuresVisibility.player).toBeFalsy()
    appStore.showPlayer()
    expect(appStore.featuresVisibility.player).toBeTruthy()
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({ player: true })
    appStore.hidePlayer()
    expect(appStore.featuresVisibility.player).toBeFalsy()
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({ player: false })
  })

  it('should show/hide mentions', () => {
    const appStore = useAppStore()
    expect(appStore.featuresVisibility.mentions).toBeFalsy()
    appStore.showMentions()
    expect(appStore.featuresVisibility.mentions).toBeTruthy()
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({
      settings: false,
    })
    appStore.hideMentions()
    expect(appStore.featuresVisibility.mentions).toBeFalsy()
  })

  it('should toggle settings', () => {
    const appStore = useAppStore()
    expect(appStore.featuresVisibility.settings).toBeFalsy()
    appStore.toggleSettings()
    expect(appStore.featuresVisibility.settings).toBeTruthy()
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({
      settings: true,
    })
    appStore.toggleSettings()
    expect(appStore.featuresVisibility.settings).toBeFalsy()
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({
      settings: false,
    })
  })

  it('should show/hide favourite songs', () => {
    const appStore = useAppStore()
    expect(appStore.featuresVisibility.favouriteSongs).toBeFalsy()
    appStore.toggleFavouriteSongs()
    expect(appStore.featuresVisibility.favouriteSongs).toBeTruthy()
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({
      favourite: true,
    })
    appStore.toggleFavouriteSongs()
    expect(appStore.featuresVisibility.favouriteSongs).toBeFalsy()
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({
      favourite: false,
    })
  })

  it('should show/hide filters', () => {
    const appStore = useAppStore()
    expect(appStore.featuresVisibility.filters).toBeFalsy()
    appStore.showFilters()
    expect(appStore.featuresVisibility.filters).toBeTruthy()
    appStore.hideFilters()
    expect(appStore.featuresVisibility.filters).toBeFalsy()
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({
      filters: false,
    })
  })

  it('should show/hide share app modal', () => {
    const appStore = useAppStore()
    expect(appStore.featuresVisibility.shareApp).toBeFalsy()
    appStore.showShareApp()
    expect(appStore.featuresVisibility.shareApp).toBeTruthy()
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({
      settings: false,
    })
    appStore.hideShareApp()
    expect(appStore.featuresVisibility.shareApp).toBeFalsy()
  })

  it('should show/hide support modal', () => {
    const appStore = useAppStore()
    expect(appStore.featuresVisibility.support).toBeFalsy()
    appStore.showSupport()
    expect(appStore.featuresVisibility.support).toBeTruthy()
    expect(useNavigationMock.pushState).toHaveBeenCalledWith({
      settings: false,
    })
    appStore.hideSupport()
    expect(appStore.featuresVisibility.support).toBeFalsy()
  })

  it('should show/hide cookies modal', () => {
    const appStore = useAppStore()
    expect(appStore.featuresVisibility.cookiesBanner).toBeFalsy()
    appStore.openCookies()
    expect(appStore.featuresVisibility.cookiesBanner).toBeTruthy()
    appStore.closeCookies()
    expect(appStore.featuresVisibility.cookiesBanner).toBeFalsy()
  })
})
