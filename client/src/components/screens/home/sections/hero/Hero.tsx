import Heading from '@/components/shared/heading/Heading'
import SearchBar from '@/components/shared/search_bar/SearchBar'
import Button from '@/components/ui/button/Button'
import React from 'react'
import './hero.component.scss'

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero_wrapper">
        <div className="hero_text_container">
          <Heading
            level="h3"
            text="Start your search here!"
            className="hero_subheading heading-h3"
          />
          <Heading
            level="h1"
            text="Large collection of books in one place"
            className="hero_heading heading-h1"
          />
        </div>

        <div className="hero_search_container">
          <SearchBar placeholder="Search" />
          <Button text="Find" isWhite className="hero_search_button" />
        </div>
      </div>
    </section>
  )
}

export default Hero
