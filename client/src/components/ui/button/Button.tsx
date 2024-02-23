import React from 'react'
import './button.component.scss'
import { ButtonProps } from './button.types'

const Button: React.FC<ButtonProps> = ({
  text,
  isActive,
  onMouseEnter,
  isWhite,
  className
}) => {
  return (
    <button
      className={`button ${isActive ? 'button-active' : 'button-default'} ${
        isWhite ? 'button-white' : ''
      } ${className}`}
      onMouseEnter={() => onMouseEnter && onMouseEnter(text)}
    >
      {text}
    </button>
  )
}

export default Button
