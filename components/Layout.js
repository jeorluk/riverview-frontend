import React from 'react'
import styled from 'styled-components'
import Nav from './Nav'
import Footer from './Footer'

const LayoutStyles = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`
const Main = styled.div`
background: white;
  /* background: url(${(props) => props.theme.img}) fixed no-repeat;
  background-position-x: ${(props) => `${props.theme.offset.x * 100}%`};
  background-position-y: ${(props) => `${props.theme.offset.y * 100}%`}; */
`

const Inner = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  margin-top: ${(props) => props.theme.headerHeight};
  padding: 0;
`

const Layout = (props) => {
  return (
    <LayoutStyles>
      <div>
        <Nav />
      </div>
      <Main>
        <Inner>{props.children}</Inner>
      </Main>
      <Footer />
    </LayoutStyles>
  )
}

export default Layout
