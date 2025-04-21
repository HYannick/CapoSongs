import { useAppStore } from '@/stores/app.store'
import { createTestingPinia } from '@pinia/testing'
import { vi } from 'vitest'

export const initAppStore = () => {
  const pinia = createTestingPinia({ createSpy: vi.fn })
  const store = useAppStore(pinia)
  return { pinia, store }
}
