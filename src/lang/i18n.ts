import en from '@/lang/en'
import fr from '@/lang/fr'
import pt from '@/lang/pt'
import { createI18n } from 'vue-i18n'

const commonI18n = { en, fr, pt }

export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: commonI18n,
  legacy: false,
})
