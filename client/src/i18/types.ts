import skForm from './sk/form'
import skSettings from './sk/settings'
//import skUser from './sk/user' =====> example of how to add another module

export type MessageSchema = {
  form: typeof skForm
  settings: typeof skSettings
  //user: typeof skUser // =====> example of how to add another module
}