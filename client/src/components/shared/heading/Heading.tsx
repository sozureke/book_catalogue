import React from 'react'
import { HeadingProps } from './heading.types'

const Heading: React.FC<HeadingProps> = ({ level, text, className }) => {
  const Tag = level as keyof JSX.IntrinsicElements
  return <Tag className={className}>{text}</Tag>
}

export default Heading
