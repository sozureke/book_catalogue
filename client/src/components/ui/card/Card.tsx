import { ReactComponent as MoreIcon } from '@/assets/icons/more_icon.svg'
import Heading from '@/components/shared/heading/Heading'
import React from 'react'
import './card.component.scss'
import { CardProps } from './card.types'

const Card: React.FC<CardProps> = ({ heading, text }) => {
  return (
    <div className="card">
      <div className="card_text_container">
        <Heading level="h3" text={heading} className="heading-h3" />
        <p className="text_container_text">{text}</p>
      </div>

      <span className="more_button">
        <MoreIcon className="more_icon-default" />
      </span>
    </div>
  )
}

export default Card
