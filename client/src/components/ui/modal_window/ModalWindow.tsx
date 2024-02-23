import Heading from '@/components/shared/heading/Heading'
import React from 'react'
import Button from '../button/Button'
import './modalWindow.component.scss'
import { ModalWindowProps } from './modalWindow.types'

const ModalWindow: React.FC<ModalWindowProps> = ({
  text,
  heading,
  imageDescription,
  imagePath,
  buttonLabel,
  buttonClassName = 'button-default'
}) => {
  return (
    <div className="modal_window">
      <div className="information_container">
        <div className="text_container">
          <Heading level="h2" text={heading} className="heading-h2" />
          <p className="container_paragraph">{text}</p>
        </div>
        <Button text={buttonLabel} isWhite={true} className={buttonClassName} />
      </div>
      <div className="image_container">
        <img src={imagePath} alt={imageDescription} />
      </div>
    </div>
  )
}

export default ModalWindow
