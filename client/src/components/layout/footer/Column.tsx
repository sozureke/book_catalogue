import React from 'react'

export interface ColumnProps {
    heading: string
    headingClass?: string
    listClass?: string
    children: React.ReactNode
}

const Column: React.FC<ColumnProps> = ({
    heading,
    headingClass,
    listClass,
    children
}) => {
    return (
        <div className="column_container">
            <h3 className={headingClass}>{heading}</h3>
            <ul className={listClass}>{children}</ul>
        </div>
    )
}

export default Column
