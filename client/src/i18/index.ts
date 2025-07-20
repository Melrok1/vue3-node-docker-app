import { createI18n } from 'vue-i18n'
import type { MessageSchema } from './types'
// SK
import formSk from './sk/form'
import settingsSk from './sk/settings'
import commonSk from './sk/common'
// EN
import formEn from './en/form'
import settingsEn from './en/settings'
import commonEn from './en/common'

export const messages: Record<'sk' | 'en', MessageSchema> = {
  sk: {
    form: formSk,
    settings: settingsSk,
    common: commonSk
  },
  en: {
    form: formEn,
    settings: settingsEn,
    common: commonEn
  }
}

const i18n = createI18n<[MessageSchema], 'sk' | 'en'>({
  legacy: false,
  locale: localStorage.getItem('app-locale') || 'sk',
  fallbackLocale: 'en',
  messages
})

export default i18n