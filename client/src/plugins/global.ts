import type { App } from 'vue'
import Ui from '@/models/ui'

// Rozšíriteľný objekt pre všetky globálne helpery
const globals = {
  $Ui: Ui,
  // $api: ApiService,   // sem môžeš časom pridať ďalšie
  // $auth: AuthService
}

export default {
  install(app: App) {
    Object.entries(globals).forEach(([key, value]) => {
      app.config.globalProperties[key] = value
    })
  }
}

// Typová deklarácia – pridáme všetky kľúče z `globals`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $Ui: typeof Ui
    $t: (key: string, ...args: any[]) => string
    // ak pridáš $api alebo $auth do globals, dopíš ich aj sem
  }
}