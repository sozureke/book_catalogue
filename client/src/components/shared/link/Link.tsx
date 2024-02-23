import React from 'react'
import { NavLink } from 'react-router-dom'
import { LinkProps } from './link.types'

const Link: React.FC<LinkProps> = ({ link, text }) => {
    return (
        <>
            <NavLink to={link}>{text ? text : 'Link'}</NavLink>
        </>
    )
}

export default Link
