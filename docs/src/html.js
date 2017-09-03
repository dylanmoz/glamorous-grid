/* eslint-disable */

import React from 'react'

const prefix = process.env.NODE_ENV === 'production' ? '/glamorous-grid' : ''

module.exports = class HTML extends React.Component {
  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
          <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css" />
          <link rel="stylesheet" href={`${prefix}/normalize.css`} />
          <link rel="stylesheet" href={`${prefix}/skeleton.css`} />
          <link rel="stylesheet" href={`${prefix}/custom.css`} />
          {this.props.headComponents}
        </head>
        <body>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}
