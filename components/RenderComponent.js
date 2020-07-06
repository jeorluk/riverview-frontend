import React from 'react'
import * as Components from '.'
import { upperFirst } from 'lodash'

const RenderComponent = ({ component }) => {
  const Component = Components[upperFirst(component._type)]
  return Component ? (
    <Component {...component} />
  ) : (
    <div>Missing component {component._type}</div>
  )
}

export default RenderComponent
