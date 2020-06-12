import React from 'react'
import styled, { css } from 'styled-components'
import BlockContent from '@sanity/block-content-to-react'
import Header from './header/Header'
import Footer from './Footer'

const LayoutStyles = styled.div`
  height: 100vh;
  padding: 0;
  overflow: scroll;

  display: grid;
  grid-template-rows: ${(props) => props.theme.mobileHeaderHeight} 1fr auto auto;
  grid-template-areas:
    'header'
    'inner'
    'sidebarStart'
    'sidebarEnd'
    'footer';

  @media (min-width: ${(props) => props.theme.desktopBreak}) {
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: ${(props) => props.theme.headerHeight} 1fr auto;
    grid-template-areas:
      'header header header'
      'sidebarStart inner sidebarEnd'
      'footer footer footer';
  }
`

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  grid-area: header;
`
const FooterContainer = styled.div`
  grid-area: footer;
`
const SideBarStart = styled.div`
  display: grid;
  padding: 1rem;
  grid-area: sidebarStart;
`
const SideBarEnd = styled.div`
  display: grid;
  padding: 1rem;
  grid-area: sidebarEnd;
`
const Inner = styled.div`
  grid-area: inner;
  width: 100%;
  display: grid;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  padding-top: 2rem;
  @media (max-width: ${(props) => props.theme.desktopBreak}) {
    padding: 2rem;
  }
`

const Layout = ({ children, sidebarStart, sidebarEnd }) => {
  return (
    <LayoutStyles>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <SideBarStart>
        {sidebarStart && <BlockContent blocks={sidebarStart} />}
      </SideBarStart>
      <SideBarEnd>
        {sidebarEnd && <BlockContent blocks={sidebarEnd} />}
      </SideBarEnd>
      <Inner>{children}</Inner>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </LayoutStyles>
  )
}

export default Layout
