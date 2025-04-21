import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createTestingPinia } from '@pinia/testing'
import { mockI18n } from '@unit/test-utils/i18n'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import SongList from 'src/components/SongList.vue'
import { useAppStore } from 'src/stores/app.store'
import { useSongStore } from 'src/stores/song.store'
import { mockSong } from 'unit/fixtures/song.fixture'

let appStore: any
let songStore: any
let component: any
const mockWrapper = () => {
  const pinia = createTestingPinia({ createSpy: vi.fn })
  appStore = useAppStore(pinia)
  songStore = useSongStore(pinia)
  songStore.favouriteSongs = [mockSong({ id: 2 })]
  appStore.showPlayer = vi.fn()
  songStore.loadSong = vi.fn()
  songStore.addToFavourite = vi.fn()
  const wrapper: VueWrapper<SongList> = shallowMount(SongList, {
    plugins: [pinia],
    global: {
      plugins: [mockI18n()],
    },
    props: {
      songs: [mockSong({ id: 1 }), mockSong({ id: 2 })],
    },
  })
  component = wrapper.vm
}
// @vitest-environment jsdom
describe('SongList', () => {
  beforeEach(() => {
    mockWrapper()
  })
  it('should check if song is favourite', () => {
    expect(component.isFavourite('1').value).toBeFalsy()
    expect(component.isFavourite('2').value).toBeTruthy()
  })

  it('should set a song to load', () => {
    component.setSong(mockSong())
    expect(songStore.loadSong).toHaveBeenCalledWith(mockSong())
    expect(appStore.showPlayer).toHaveBeenCalled()
  })

  it('should add a song to Favourite', () => {
    component.addToFavourite(mockSong())
    expect(songStore.addToFavourite).toHaveBeenCalledWith(mockSong())
  })

  it('should remove from favourite if the song already exists', () => {
    component.addToFavourite(mockSong({ id: 2 }))
    expect(songStore.removeFromFavourite).toHaveBeenCalledWith(2)
    expect(songStore.addToFavourite).not.toHaveBeenCalled()
  })
})
