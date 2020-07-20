import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import Header from './header/Header'
import Footer from './Footer'
import Modal from './Modal'
import { Router } from 'next/router'

const LayoutStyles = styled.div(
  ({ theme, leftwidth, rightwidth, mainwidth }) => css`
    width: 100vw;
    height: 100vh;
    padding: 0;
    overflow-y: scroll;

    display: grid;
    /* column-gap: 0.5rem; */
    grid-template-rows: ${theme.mobileHeaderHeight} 1fr auto auto;
    grid-template-areas:
      'header'
      'inner'
      'sidebarStart'
      'sidebarEnd'
      'footer';

    @media (min-width: ${theme.desktopBreak}) {
      grid-template-columns: minmax(0, ${leftwidth}) minmax(0, ${mainwidth}) minmax(
          0,
          ${rightwidth}
        );
      grid-template-rows: ${theme.headerHeight} 1fr auto;
      grid-template-areas:
        'header header header'
        'sidebarStart inner sidebarEnd'
        'footer footer footer';
    }
  `
)

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
  grid-area: sidebarStart;
  padding-top: 2rem;
`
const SideBarEnd = styled.div`
  grid-area: sidebarEnd;
  padding-top: 2rem;
`
const Inner = styled.div`
  grid-area: inner;
  padding-top: 2rem;
  /* display: flex; */
  /* flex-direction: column; */
  /* align-content: top; */
  /* max-width: ${(props) => props.theme.maxWidth}; */
  /* margin: 0 auto; */
  /* padding-top: 2rem; */
  @media (max-width: ${(props) => props.theme.desktopBreak}) { 
    padding: 2rem;
   }
`

const Layout = ({ children, inner, sidebarStart, sidebarEnd, columns }) => {
  const { leftWidth = '1fr', mainWidth = '4fr', rightWidth = '1fr' } = columns
    ? columns
    : { leftWidth: '1fr', mainWidth: '4fr', rightWidth: '1fr' }
  const layoutRef = useRef()
  const scrollToTop = () => {
    layoutRef.current.scrollTop = 0
  }
  useEffect(() => {
    Router.events.on('routeChangeComplete', scrollToTop)

    return Router.events.off('routeChangeComplete', scrollToTop)
  }, [])

  return (
    <>
      <Modal />
      <LayoutStyles
        ref={layoutRef}
        leftwidth={leftWidth}
        mainwidth={mainWidth}
        rightwidth={rightWidth}
      >
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <SideBarStart>{sidebarStart}</SideBarStart>
        <SideBarEnd>{sidebarEnd}</SideBarEnd>
        <Inner>
          <>
            {children}
            {inner}
          </>
        </Inner>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </LayoutStyles>
    </>
  )
}

export default Layout
