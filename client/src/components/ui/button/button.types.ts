// button.types.ts
export interface ButtonProps {
  text: string
  isActive?: boolean
  isWhite?: boolean
  className?: string
  onMouseEnter?: (buttonName: string) => void
}
