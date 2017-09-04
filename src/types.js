// @flow

export type GridTheme = {
  grid_breakpoints: Object,
  max_container_width: Object,
  column_gutter: Object,
  outer_gutter: Object
}

export type ValueOrValueMap<T> = T | { [breakpoint: string]: T }
