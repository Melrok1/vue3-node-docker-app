enum Size {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
}

enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
  TEXT = 'text',
  ICON = 'icon'
}

export type SizeType = `${Size}`
export type ButtonVariantType = `${ButtonVariant}`

const Ui = {
  Size,
  ButtonVariant
}

export default Ui