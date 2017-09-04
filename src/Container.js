// @flow

import type { ComponentType } from 'react'
import glamorous from 'glamorous'
import shallowEqual from 'fbjs/lib/shallowEqual'

import getTheme from './getTheme'
import breakpoints from './breakpoints'
import withSpacing from './withSpacing'

type Props = {
  fluid?: boolean
}

const Container = glamorous(
  'div',
  {
    shouldClassNameUpdate: (props, nextProps, context, nextContext) => (
      (props.fluid !== nextProps.fluid) || !shallowEqual(context.theme, nextContext.theme)
    )
  }
)(
  {
    width: '100%',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    boxSizing: 'border-box'
  },
  (props) => {
    const gridTheme = getTheme(props)

    return breakpoints(gridTheme.outer_gutter, gridTheme, size => size && ({
      paddingLeft: size,
      paddingRight: size
    }))
  },
  (props) => {
    if (props.fluid) return

    const gridTheme = getTheme(props)
    const containerWidths = gridTheme.max_container_width

    return breakpoints(containerWidths, gridTheme, size => size && ({
      width: size,
      maxWidth: '100%'
    }))
  }
)

export default withSpacing((Container: ComponentType<Props>))
