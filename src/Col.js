// @flow

import type { ComponentType } from 'react'
import glamorous from 'glamorous'
import shallowEqual from 'fbjs/lib/shallowEqual'

import type { ValueOrValueMap } from './types'
import getTheme from './getTheme'
import breakpoints from './breakpoints'
import withSpacing from './withSpacing'

type Props = {
  span?: ValueOrValueMap<number>,
  equalWidth?: ValueOrValueMap<boolean>,
  auto?: ValueOrValueMap<boolean>,
  offset?: ValueOrValueMap<number>,
  alignSelf?: ValueOrValueMap<'start' | 'end' | 'center'>,
  textAlign?: ValueOrValueMap<'left' | 'right' | 'center'>,
}

const alignMap = {
  start: 'flex-start',
  end: 'flex-end'
}

const isNil = val => (val === undefined || val === null)

const Col = glamorous(
  'div',
  {
    shouldClassNameUpdate: (props, nextProps, context, nextContext) => (
      !shallowEqual(context.theme, nextContext.theme)
      || !shallowEqual(props.span, nextProps.span)
      || !shallowEqual(props.equalWidth, nextProps.equalWidth)
      || !shallowEqual(props.auto, nextProps.auto)
      || !shallowEqual(props.offset, nextProps.offset)
      || !shallowEqual(props.alignSelf, nextProps.alignSelf)
      || !shallowEqual(props.textAlign, nextProps.textAlign)
    )
  }
)(
  {
    position: 'relative',
    width: '100%',
    minHeight: 1,
    boxSizing: 'border-box'
  },
  (props) => {
    const gridTheme = getTheme(props)
    const gutters = gridTheme.column_gutter

    return breakpoints(gutters, gridTheme, size => !isNil(size) && ({
      paddingLeft: parseFloat(size) / 2,
      paddingRight: parseFloat(size) / 2
    }))
  },
  (props) => {
    const gridTheme = getTheme(props)

    return breakpoints(props.span, gridTheme, span => span && ({
      flex: `0 0 ${span * 100}%`,
      maxWidth: `${span * 100}%`
    }))
  },
  (props) => {
    const gridTheme = getTheme(props)

    return breakpoints(props.equalWidth, gridTheme, (equalWidth = false) => {
      if (equalWidth || (!props.equalWidth && !props.span)) {
        return {
          flexBasis: 0,
          flexGrow: 1,
          maxWidth: '100%'
        }
      }
    })
  },
  (props) => {
    const gridTheme = getTheme(props)

    return breakpoints(props.auto, gridTheme, (auto = false) => auto && ({
      flex: '0 0 auto',
      width: 'auto'
    }))
  },
  (props) => {
    const gridTheme = getTheme(props)

    return breakpoints(props.offset, gridTheme, offset => !isNil(offset) && ({
      marginLeft: `${offset * 100}%`
    }))
  },
  (props) => {
    const gridTheme = getTheme(props)

    return breakpoints(props.alignSelf, gridTheme, align => align && ({
      alignSelf: `${alignMap[align] || align}`
    }))
  },
  (props) => {
    const gridTheme = getTheme(props)

    return breakpoints(props.textAlign, gridTheme, align => align && ({
      textAlign: align
    }))
  },
)

export default withSpacing((Col: ComponentType<Props>))
