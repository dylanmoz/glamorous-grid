// @flow

import React from 'react'

type Props = {
  initial: number,
  value: number,
  period: number,
  children: Function
}

export default class Delay extends React.Component<Props> {
  static defaultProps = {
    period: 0
  }

  state = {
    value: this.props.initial
  }

  componentDidMount() {
    this.refresh(this.props)
  }

  componentWillReceiveProps(next) {
    this.refresh(next)
  }

  refresh(props) {
    let { value, period } = props

    setTimeout(() => this.setState({
      value
    }), period)
  }

  render(){
    return this.props.children(this.state.value)
  }
}
