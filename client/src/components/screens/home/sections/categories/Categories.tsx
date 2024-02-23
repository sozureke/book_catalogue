import BookCard from '@/components/shared/book_card/BookCard'
import Heading from '@/components/shared/heading/Heading'
import Switcher from '@/components/ui/switcher/Switcher'
import { switcherName } from '@/data/switcher_name.data'
import React, { useState } from 'react'
import './categories.component.scss'

const Categories: React.FC = () => {
  // switcher change handling
  const [activeSwitcher, setActiveButton] = useState<string>('switcher_all')

  const handleMouseEnter = (buttonName: string) => {
    setActiveButton(buttonName)
  }

  return (
    <section className="categories">
      <Heading
        level="h2"
        text="Categories"
        className="categories_heading heading-h2"
      />

      <div className="categories_button_list">
        {switcherName.map((switcher) => (
          <Switcher
            key={switcher.id}
            text={switcher.name}
            isActive={activeSwitcher === switcher.id}
            onMouseEnter={() => handleMouseEnter(switcher.id)}
          />
        ))}
      </div>

      <div className="categories_book_list">
        <BookCard
          bookName="Harry Potter and the Philosopher's Stone"
          bookImagePath="../../../../../../public/images/books/img.jpg"
          bookAltText="Harry Potter"
          bookAuthor="by Joanne Rowling"
        />
      </div>
    </section>
  )
}

export default Categories
