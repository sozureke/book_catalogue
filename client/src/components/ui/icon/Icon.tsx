import React from 'react'
import { IconProps } from './icon.types'

const Icon: React.FC<IconProps> = ({ path, alt, className }) => {
  return <img src={path} alt={alt} className={className} />
}

export default Icon
