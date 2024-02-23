import { ReactComponent as SearchIcon } from '@/assets/icons/search_icon.svg'
import React, { useState } from 'react'
import './searchBar.component.scss'
import { SearchBarProps } from './searchBar.types'

const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({ placeholder, isDark }) => {
    const [inputValue, setInputValue] = useState('')
    const [isInputActive, setInputActive] = useState(false)

    // Update inputValue state when input is changed
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value)
    }

    // Check if the input is active or if it contains text
    const isIconWhite = isInputActive || inputValue.length > 0

    return (
      <div
        className={`search_bar ${
          isDark ? 'search_bar-dark' : 'search_bar-default'
        }`}
      >
        <SearchIcon
          className={`search_bar_icon ${isIconWhite ? 'active' : ''}`}
        />
        <input
          type="text"
          id="search_bar_input"
          placeholder={placeholder}
          onFocus={() => setInputActive(true)}
          onBlur={() => setInputActive(false)}
          onChange={handleInputChange}
          value={inputValue}
        />
      </div>
    )
  }
)

export default SearchBar
