import type { App } from 'vue'
import Ui from '@/models/ui'

export default {
  install(app: App) {
    app.config.globalProperties.$Ui = Ui
  }
}

// Typová deklarácia pre globálne použitie
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $Ui: typeof Ui
  }
}