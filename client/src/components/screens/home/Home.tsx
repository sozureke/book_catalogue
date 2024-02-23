import React from 'react'
import About from './sections/about/About'
import Categories from './sections/categories/Categories'
import Hero from './sections/hero/Hero'

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Categories />
      <About />
    </>
  )
}

export default Home
