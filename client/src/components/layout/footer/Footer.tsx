import Heading from '@/components/shared/heading/Heading'
import Link from '@/components/shared/link/Link'
import {
  navigationData,
  projectLinks,
  socialMediaLinks
} from '@/data/navigation.data'
import React from 'react'
import Newsletter from '../newsletter/Newsletter'
import Column from './Column'
import './footer.component.scss'

interface LinkItem {
  path: string
  name: string
}

const generateLinksList = (links: LinkItem[]) =>
  links.map((item, index) => (
    <li key={index} className="list_item">
      <Link link={item.path} text={item.name} />
    </li>
  ))

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="nav_block">
        <Heading
          level="h2"
          text="Footer"
          className="footer_heading heading-h2"
        />
        <nav className="footer_navigation">
          <Column
            heading="Navigation"
            headingClass="heading-default"
            listClass="footer_navigation_list"
          >
            {generateLinksList(navigationData)}
          </Column>
          <Column
            heading="Developer"
            headingClass="heading-default"
            listClass="footer_navigation_list"
          >
            {generateLinksList(socialMediaLinks)}
          </Column>
          <Column
            heading="Project"
            headingClass="heading-default"
            listClass="footer_navigation_list"
          >
            {generateLinksList(projectLinks)}
          </Column>
        </nav>
      </div>
      <Newsletter />
    </footer>
  )
}

export default Footer
