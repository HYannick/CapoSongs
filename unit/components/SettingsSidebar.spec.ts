import { describe, expect, it } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import SettingsSidebar from '../../src/components/sidebar/SettingsSidebar.vue'

// @vitest-environment jsdom
describe('Settings', () => {
  it('should emit event to open favourite songs sidebar', () => {
    const wrapper = shallowMount(SettingsSidebar)
    const component = wrapper.vm
    component.showFavouriteSongs()
    expect(wrapper.emitted('show-favourite-songs')).toBeTruthy()
  })

  it('should emit event to open settings sidebar', () => {
    const wrapper = shallowMount(SettingsSidebar)
    const component = wrapper.vm
    component.showSettings()
    expect(wrapper.emitted('show-settings')).toBeTruthy()
  })
})
