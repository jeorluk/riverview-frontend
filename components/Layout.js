import React from 'react'
import styled, { css } from 'styled-components'
import Header from './header/Header'
import Footer from './Footer'

const LayoutStyles = styled.div`
  height: 100vh;
  padding: 0;
  overflow: scroll;
  /* background: url('/blankBackground.jpg'); */
  /* background-size: cover; */
  /* background-position: -100px; */
  @media (min-width: ${(props) => props.theme.desktopBreak}){

  background: url('/background.jpg');
background-size: cover;
background-position: left bottom;
  }
  /* background: url('/background.png'); */
  /* background-position-x: ${(props) => `${props.theme.offset.x * 100}%`}; */
  /* background-position-x: ${(props) => `${props.theme.offset.y * 100}%`}; */
  display: grid;
  grid-template-rows:
    calc(
      ${(props) => props.theme.mediaBarHeight} +
        ${(props) => props.theme.navBarHeight}
    )
    auto 1fr auto;
`

const PageTitle = styled.h1(
  ({ theme }) => css`
    /* font-variant: small-caps; */
    /* font-size: 6rem; */
    color: ${theme.color.darkAccent};
    text-align: center;
    /* margin: 25px; */
  `
)

const Inner = styled.div`
  /* border: 2px solid blueviolet; */
  width: 100%;
  /* background: rgba(255, 255, 255, 0.6); */
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0;
`

const Layout = ({ title, children }) => {
  return (
    <LayoutStyles>
      <Header />
      <PageTitle>{title}</PageTitle>
      <Inner>{children}</Inner>
      <Footer />
    </LayoutStyles>
  )
}

export default Layout
