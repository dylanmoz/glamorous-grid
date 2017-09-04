// @flow

import type { ComponentType } from 'react'
import glamorous from 'glamorous'
import shallowEqual from 'fbjs/lib/shallowEqual'

import type { ValueOrValueMap } from './types'
import getTheme from './getTheme'
import breakpoints from './breakpoints'
import withSpacing from './withSpacing'

type Props = {
  wrap?: ValueOrValueMap<'wrap' | 'nowrap'>,
  justifyContent?: ValueOrValueMap<'start' | 'end' | 'between' | 'around'>,
  alignItems?: ValueOrValueMap<'start' | 'end' | 'stretch' | 'center'>,
  direction?: ValueOrValueMap<'row' | 'column'>,
  noGutters?: ValueOrValueMap<boolean>
}

const justifyMap = {
  start: 'flex-start',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around'
}

const alignMap = {
  start: 'flex-start',
  end: 'flex-end',
  stretch: 'stretch'
}

const isNil = val => (val === undefined || val === null)

const Row = glamorous(
  'div',
  {
    shouldClassNameUpdate: (props, nextProps, context, nextContext) => (
      !shallowEqual(context.theme, nextContext.theme)
      || !shallowEqual(props.wrap, nextProps.wrap)
      || !shallowEqual(props.justifyContent, nextProps.justifyContent)
      || !shallowEqual(props.alignItems, nextProps.alignItems)
      || !shallowEqual(props.flexDirection, nextProps.flexDirection)
      || !shallowEqual(props.noGutters, nextProps.noGutters)
    )
  }
)(
  {
    display: 'flex',
    boxSizing: 'border-box'
  },
  (props) => {
    const gridTheme = getTheme(props)
    const gutters = gridTheme.column_gutter

    return breakpoints(gutters, gridTheme, size => !isNil(size) && ({
      marginLeft: parseFloat(size) / -2,
      marginRight: parseFloat(size) / -2
    }))
  },
  (props) => {
    const gridTheme = getTheme(props)

    return breakpoints(props.wrap, gridTheme, (wrap = 'wrap') => ({
      flexWrap: wrap
    }))
  },
  (props) => {
    const gridTheme = getTheme(props)
    const justifyContent = props.justifyContent

    return breakpoints(justifyContent, gridTheme, (justify = 'start') => ({
      justifyContent: justifyMap[justify] || justify
    }))
  },
  (props) => {
    const gridTheme = getTheme(props)
    const alignItems = props.alignItems

    return breakpoints(alignItems, gridTheme, (align = 'stretch') => ({
      alignItems: alignMap[align] || align
    }))
  },
  (props) => {
    const gridTheme = getTheme(props)

    return breakpoints(props.direction, gridTheme, (direction = 'row') => ({
      flexDirection: direction
    }))
  },
  (props) => {
    const gridTheme = getTheme(props)

    return breakpoints(props.noGutters, gridTheme, (noGutters = false) => noGutters && ({
      marginRight: '0 !important',
      marginLeft: '0 !important',
      '& > div': {
        paddingRight: 0,
        paddingLeft: 0
      }
    }))
  }
)

export default withSpacing((Row: ComponentType<Props>))
