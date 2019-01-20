import React from 'react'
import Map from './Map'
import NotFound from './NotFound'

export default class Container extends React.Component {
  state={}
  componentDidMount() {

  }
  render() {
    const {match} = this.props
    const {params} = match
    const {key} = params
    if (typeof(key)==='string') {
      const component = Map[key]
      if (typeof(component)==='object'&&component!==null) {
        const View = component.default
        if (typeof(View)==='function'||(typeof(View)==='object'&&View!==null)) {
          return (
            <View {...this.props} />
          )
        }
      }
    }
    return (
      <NotFound {...this.props} />
    )
  }
}
