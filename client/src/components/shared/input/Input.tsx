import './input.component.scss'
import { InputProps } from './input.types'

import React from 'react'

const Input: React.FC<InputProps> = ({
    id,
    inputType,
    placeholder,
    className,
    isHidden = false
}) => {
    return (
        <input
            id={id}
            type={inputType || 'text'}
            placeholder={placeholder || 'Placeholder'}
            className={className || 'input-default'}
            disabled={isHidden}
        />
    )
}

export default Input
