import React from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'
import LayoutProps from './layout.types'

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <div className="container">
                <Header />
                <main>{children}</main>
                <Footer />
            </div>
        </>
    )
}

export default Layout
