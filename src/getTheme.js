// @flow

import type { GridTheme } from './types'

import defaultTheme from './defaultTheme'

export default function getTheme(props: any): GridTheme {
  if (props && props.theme && props.theme.grid) {
    return props.theme.grid
  }

  return defaultTheme
}
