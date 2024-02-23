import Input from '@/components/shared/input/Input'
import './newsletter.component.scss'
import { NewsletterProps } from './newsletter.types'

import Heading from '@/components/shared/heading/Heading'
import React from 'react'

const Newsletter: React.FC<NewsletterProps> = () => {
  return (
    <div className="newsletter_block">
      <Heading
        level="h2"
        text="Newsletter"
        className="newsletter_heading heading-h2"
      />

      <div className="input_block">
        <Input
          className="input-default"
          id="username"
          inputType="text"
          placeholder="Name"
        />
        <Input
          className="input-default"
          id="newsletter"
          inputType="email"
          placeholder="Email"
        />
      </div>

      <Input inputType="submit" className="newsletter_button" />
    </div>
  )
}

export default Newsletter
