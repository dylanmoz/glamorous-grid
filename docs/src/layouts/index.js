// @flow

import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

const NavbarLink = props => (
  <li className="navbar-item">
    <Link className="navbar-link" {...props} />
  </li>
)

const Header = () => (
  <nav className="navbar">
    <div className="container">
      <ul className="navbar-list">
        <NavbarLink to="/">Home</NavbarLink>
        {/* <NavbarLink to="/">Home</NavbarLink> */}
      </ul>
    </div>
  </nav>
)

const TemplateWrapper = ({ children }: any) => (
  <div>
    <Helmet
      title="glamorous-grid"
      meta={[
        { name: 'description', content: 'Responsive React grid layout components built with glamorous' },
        { name: 'keywords', content: 'react, glamorous, grid, layout, responsive, mobile' },
      ]}
    />

    <Header />

    <div style={{ marginTop: '6.5rem', width: '100%', display: 'flex', position: 'relative' }}>
      {children()}
    </div>
  </div>
)

export default TemplateWrapper
