import React from 'react'
import * as Components from '../components'
import { upperFirst } from 'lodash'
import styled from 'styled-components'

const SidebarComponentStyles = styled.div`
  .hideInMobile {
    @media (max-width: ${(props) => props.theme.desktopBreak}) {
      display: none;
      background: blue;
    }
  }
`

const RenderSidebarComponents = ({ components }) => {
  return (
    <SidebarComponentStyles>
      {components.map((component) => {
        const Component = resolveComponent(component)
        return Component ? (
          <div
            key={component._key}
            className={!component.mobile ? 'hideInMobile' : ''}
          >
            <Component {...component} key={component._key} />
          </div>
        ) : (
          <div key={component._key} className='text_hero'>
            Missing component {component._type}
          </div>
        )
      })}
    </SidebarComponentStyles>
  )
}

const resolveComponent = (component) => {
  return Components[upperFirst(component._type)]
}

export default RenderSidebarComponents
