// @flow

import React from 'react'
import Link from 'gatsby-link'

import { Col } from '../../../src'

const IndexPage = () => (
  <div>
    <h1><code>glamorous-grid</code></h1>
    <Col />
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)

export default IndexPage
