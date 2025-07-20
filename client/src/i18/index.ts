import { createI18n } from 'vue-i18n'
import type { MessageSchema } from './types'
// SK
import formSk from './sk/form'
// EN
import formEn from './en/form'

export const messages: Record<'sk' | 'en', MessageSchema> = {
  sk: {
    form: formSk
  },
  en: {
    form: formEn
  }
}

const i18n = createI18n<[MessageSchema], 'sk' | 'en'>({
  legacy: false,
  locale: 'sk',
  fallbackLocale: 'en',
  messages
})

export default i18n