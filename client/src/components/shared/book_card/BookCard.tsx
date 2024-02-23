import React from 'react'
import Heading from '../heading/Heading'
import './book_card.component.scss'
import { BookCardProps } from './book_card.types'

const BookCard: React.FC<BookCardProps> = ({
  bookAuthor,
  bookName,
  bookImagePath,
  bookAltText
}) => {
  return (
    <div className="book_card">
      <div>
        <img
          src={bookImagePath}
          alt={bookAltText}
          className="book_card_image"
        />
      </div>
      <div className="book_card_text_container">
        <Heading level="h4" text={bookName} className="heading-h4" />
        <p className="container_text">{bookAuthor}</p>
      </div>
    </div>
  )
}

export default BookCard
