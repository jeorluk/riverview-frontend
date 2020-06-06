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
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('/tablature.jpg');
  background-size: cover;
  background-position: center;
  border-bottom: 5px solid ${(props) => props.theme.color.darkAccent};
  box-shadow: ${(props) => props.theme.bs};
`

const Inner = styled.div`
  margin: auto;
  max-width: 1000px;
  display: grid;
  grid-auto-flow: row;
`

const Header = () => {
  return (
    <HeaderStyles>
      {/* <Inner> */}
      <MediaBar />
      <Nav />
      {/* </Inner> */}
    </HeaderStyles>
  )
}

export default Header
