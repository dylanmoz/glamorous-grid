// @flow

import type { ComponentType } from 'react'
import glamorous from 'glamorous'
import shallowEqual from 'fbjs/lib/shallowEqual'

import type { ValueOrValueMap } from './types'
import breakpoints from './breakpoints'
import getTheme from './getTheme'

type SpacingProps = {
  p?: ValueOrValueMap<any>,
  m?: ValueOrValueMap<any>,
  pt?: ValueOrValueMap<any>,
  pr?: ValueOrValueMap<any>,
  pb?: ValueOrValueMap<any>,
  pl?: ValueOrValueMap<any>,
  mt?: ValueOrValueMap<any>,
  mr?: ValueOrValueMap<any>,
  mb?: ValueOrValueMap<any>,
  ml?: ValueOrValueMap<any>,
  py?: ValueOrValueMap<any>,
  px?: ValueOrValueMap<any>,
  my?: ValueOrValueMap<any>,
  mx?: ValueOrValueMap<any>
}

const spacingProps = {
  p: ['padding'],
  m: ['margin'],
  pt: ['paddingTop'],
  pr: ['paddingRight'],
  pb: ['paddingBottom'],
  pl: ['paddingLeft'],
  mt: ['marginTop'],
  mr: ['marginRight'],
  mb: ['marginBottom'],
  ml: ['marginLeft'],
  py: ['paddingTop', 'paddingBottom'],
  px: ['paddingLeft', 'paddingRight'],
  my: ['marginTop', 'marginBottom'],
  mx: ['marginLeft', 'marginRight']
}

const propKeys = Object.keys(spacingProps)
const pick = obj => propKeys.reduce(
  (acc, key) => ({ ...acc, [key]: obj[key] }),
  {}
)

const withSpacingArgs = propKeys.map(prop => (
  (props, theme) => breakpoints(props[prop], theme, arg => arg && (
    spacingProps[prop].reduce(
      (acc, cssProp) => ({ ...acc, [cssProp]: arg }),
      {}
    )
  ))
))

const getSpacingStyles = (props, theme) => (
  withSpacingArgs.reduce((acc, fn) => ({
    ...acc,
    ...fn(props, theme)
  }), {}) // noop needed otherwise glamor throws a cache-miss error...
)

export default function withSpacing<Props>(Component: ComponentType<Props>) {
  return (glamorous(Component, {
    shouldClassNameUpdate: (props, nextProps) => (
      !shallowEqual(pick(props), pick(nextProps))
    )
  })(
    props => getSpacingStyles(props, getTheme(props))
  ): ComponentType<Props & SpacingProps>)
}
