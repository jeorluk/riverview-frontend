import React from 'react'
import styled from 'styled-components'
import MediaBar from './MediaBar'
import Nav from './Nav.js'

const HeaderStyles = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  background: ${(props) => props.theme.color.darkShade};
`
const Header = () => {
  return (
    <HeaderStyles>
      <MediaBar />
      <Nav />
    </HeaderStyles>
  )
}

export default Header
