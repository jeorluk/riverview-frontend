import React from 'react'
import styled, { css } from 'styled-components'
import Header from './header/Header'
import Footer from './Footer'

const LayoutStyles = styled.div`
  height: 100vh;
  padding: 0;
  overflow: scroll;

  display: grid;
  grid-template-rows:
    calc(
      ${(props) => props.theme.mediaBarHeight} +
        ${(props) => props.theme.navBarHeight}
    )
    1fr auto;
`

const Inner = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  padding-top: 1rem;
`

const Layout = ({ children }) => {
  return (
    <LayoutStyles>
      <Header />
      <Inner>{children}</Inner>
      <Footer />
    </LayoutStyles>
  )
}

export default Layout
