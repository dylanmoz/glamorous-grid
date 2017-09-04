// @flow

import type { GridTheme } from './types'

/**
 * Returns an object of media queries with their respective styles.
 *
 * @param value - The prop, either a value, like 20, or an object for breakpoints,
 *                    such as { sm: 20, md: 50, xl: 80 }
 * @param theme - The theme object
 * @param mapFn - Function that will be called with the value (20), or multiple times with
 *                each individual value. Should return a style object or falsy for no styles.
 */
export default function breakpoints(value: any, theme: GridTheme, mapFn: Function) {
  if (typeof value === 'object') {
    const cssValues = Object.keys(value).reduce((acc, key) => ({
      ...acc,
      ...breakpoint(key, mapFn(value[key]), theme)
    }), {})

    return {
      ...mapFn(undefined), // set the default value
      ...cssValues
    }
  }

  return mapFn(value)
}

function breakpoint(name: string, styles: any, theme: GridTheme) {
  const breakpointValue = theme.grid_breakpoints[name]
  const bp = `${breakpointValue}${typeof breakpointValue === 'number' ? 'px' : ''}`

  return {
    [`@media (min-width: ${bp})`]: styles
  }
}
