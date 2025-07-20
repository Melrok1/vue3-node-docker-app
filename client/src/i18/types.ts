import skForm from './sk/form'
//import skUser from './sk/user' =====> example of how to add another module

export type MessageSchema = {
  form: typeof skForm
  //user: typeof skUser // =====> example of how to add another module
}