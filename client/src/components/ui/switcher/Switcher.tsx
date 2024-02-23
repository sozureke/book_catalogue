import React from 'react'
import './switcher.component.scss'
import { SwitcherProps } from './switcher.types'

const Switcher: React.FC<SwitcherProps> = ({
  text,
  isActive,
  onMouseEnter
}) => {
  return (
    <button
      className={`switcher ${
        isActive ? 'switcher-active' : 'switcher-default'
      }`}
      onMouseEnter={() => onMouseEnter && onMouseEnter(text)}
    >
      {text}
    </button>
  )
}

export default Switcher
