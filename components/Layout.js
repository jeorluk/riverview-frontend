import React from 'react'
import styled from 'styled-components'
import Nav from './Nav'
import Footer from './Footer'

const LayoutStyles = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`

const Inner = styled.div`
  max-width: ${(props) => props.theme.maxWidth};

  margin: 0 auto;
  margin-top: 125px;
  padding: 0;

  @media (min-width: ${(props) => props.theme.tabletBreak}) {
    margin-top: 175px;
  }
`

const Layout = (props) => {
  return (
    <LayoutStyles>
      <Nav />
      <Inner>{props.children}</Inner>
      <Footer />
    </LayoutStyles>
  )
}

export default Layout
