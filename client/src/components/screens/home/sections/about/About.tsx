import Heading from '@/components/shared/heading/Heading'
import Card from '@/components/ui/card/Card'
import React from 'react'
import './about.component.scss'

const About: React.FC = () => {
  // const [modal, setModal] = useState(false)

  // const handleModal = () => {
  //   setModal(!modal)
  // }

  return (
    <section className="about">
      <Heading level="h2" text="About" className="about_heading heading-h2" />

      <div className="about_card_list">
        <Card
          heading="Search"
          text="Finding the perfect book has never been easier or&nbsp;more convenient. With our advanced search engine, you can quickly and effortlessly find books by&nbsp;title, author."
        />

        <Card
          heading="Collection"
          text="Create your own unique collections that reflects your personal taste and preferences. From books that have shaped you as&nbsp;a&nbsp;person to&nbsp;those you plan to&nbsp;read, let your collection be&nbsp;as&nbsp;unique as&nbsp;you are."
        />
        <Card
          heading="Explore"
          text="Explore the world of&nbsp;literature without borders. Our site allows you to&nbsp;find books on&nbsp;Google Books and Amazon Books, giving you access to&nbsp;a&nbsp;huge range of&nbsp;titles from around the world. "
        />
      </div>
    </section>
  )
}

export default About
