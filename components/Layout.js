import React from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import Nav from './Nav'
import { Html } from 'next/document'
import Head from 'next/head'

const theme = {
  textLight: '#FFFFFF',
  textDark: '#000000',

  primaryDark: '#AAAAAA',
  primary: '#CCCCCC',
  primaryLight: '#FFFFFF',

  secondaryDark: '#000000',
  secondary: '#404040',
  secondaryLight: '#808080',

  tabletBreak: '600px',
  desktopBreak: '1200px',

  maxWidth: '1000px',
  maxHeaderHeight: '100px',
  bs: `0 3px 6px rgba(0,0,0,.7)`,
}

const GlobalStyle = createGlobalStyle`
   @font-face {
     font-family: 'montserrat';
     src: url('/Montserrat-Regular.ttf') format('truetype');
     font-weight: normal;
     font-style: normal;
     font-color: ${theme.primaryLight};
   }

   html {
     /* height: 100vh; */
     /* width: 100vw; */
     box-sizing: border-box;
     font-size: 10px;
   }
   *, *:before, *:after {
     box-sizing: inherit;
   }

   body {
     font-family: 'montserrat';
     /* overflow-x: hidden; */
     font-weight: normal;
     font-style: normal;
     font-size: 1.5rem;
     background: ${theme.primaryLight};
     color: ${theme.textDark};
     padding: 0;
     margin: 0;
   }

   a {
       text-decoration: none;
       color: ${theme.textDark};
   }
`

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};

  margin: 0 auto;
  margin-top: 125px;
  padding: 0;

  @media (min-width: ${props => props.theme.tabletBreak}) {
    margin-top: 175px;
  }
`

const Footer = styled.div``
const Layout = props => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Nav />
      <Inner>{props.children}</Inner>
      {/* <Footer>This is the footer content!</Footer> */}
    </ThemeProvider>
  )
}

export default Layout
