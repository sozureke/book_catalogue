import { ReactComponent as Logo } from '@/assets/icons/logo.svg'
import Link from '@/components/shared/link/Link'
import SearchBar from '@/components/shared/search_bar/SearchBar'
import Button from '@/components/ui/button/Button'
import { navigationData } from '@/data/navigation.data'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './header.component.scss'

const Header: React.FC = () => {
  // buttons change handling
  const [activeButton, setActiveButton] = useState<string>('button_2')

  const handleMouseEnter = (buttonName: string) => {
    setActiveButton(buttonName)
  }

  return (
    <>
      <header className="header">
        <NavLink to="/" className="header_logo">
          <Logo />
        </NavLink>

        <nav className="header_navigation">
          <ul className="header_navigation_list">
            {navigationData.map((item, index) => (
              <li key={index} className="list_item">
                <Link link={item.path} text={item.name} />
              </li>
            ))}
          </ul>
        </nav>

        <SearchBar placeholder="Search" isDark />

        <div className="header_buttons_list">
          <Button
            text="Log in"
            isActive={activeButton === 'button_1'}
            onMouseEnter={() => handleMouseEnter('button_1')}
          />
          <Button
            text="Sign in"
            isActive={activeButton === 'button_2'}
            onMouseEnter={() => handleMouseEnter('button_2')}
          />
        </div>
      </header>
    </>
  )
}

export default Header
