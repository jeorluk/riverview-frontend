import React from 'react'
import * as Components from '../components'
import { upperFirst } from 'lodash'

const RenderComponents = ({ components }) => {
  return (
    <>
      {components.map((component) => {
        const Component = resolveComponent(component)
        return Component ? (
          <Component {...component} key={component._key} />
        ) : (
          <div className='text_hero'>Missing component {component._type}</div>
        )
      })}
    </>
  )
}

const resolveComponent = (component) => {
  return Components[upperFirst(component._type)]
}

export default RenderComponents
