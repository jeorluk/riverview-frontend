import App from 'next/app'
import { ThemeProvider, createGlobalStyle, css } from 'styled-components'
import { config } from '@fortawesome/fontawesome-svg-core'
import groq from 'groq'
import client from '../client'

import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
import { HoveredItemContextProvider } from '../context'
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const GlobalStyle = createGlobalStyle`
:root{
  /*Type sizes (Major Second for mobile) */
  --line-height: 1.2;
  --size-up-five: 1.802rem;
  --size-up-four: 1.602rem;
  --size-up-three: 1.424rem;
  --size-up-two: 1.266rem;
  --size-up-one: 1.125rem;
  --size-down-one: 0.889rem;
  --size-down-two: 0.79rem;
  --size-down-three: 0.702rem;

  
  
  @media (min-width: ${(props) => props.theme.tabletBreak}){
  /*Type sizes (Minor Third for tablet) */
  --line-height: 1.4;
  --size-up-five: 2.488rem;
  --size-up-four: 2.074rem;
  --size-up-three: 1.728rem;
  --size-up-two: 1.44rem;
  --size-up-one: 1.2rem;
  --size-down-one: 0.833rem;
  --size-down-two: 0.694rem;
  --size-down-three: 0.579rem;
 
  }
  @media (min-width: ${(props) => props.theme.desktopBreak}){
  /*Type sizes (Major Third for desktop) */
  --line-height: 1.65;
  --size-up-five: 3.052rem;
  --size-up-four: 2.441rem;
  --size-up-three: 1.953rem;
  --size-up-two: 1.563rem;
  --size-up-one: 1.25rem;
  --size-down-one: 0.8rem;
  --size-down-two: 0.64rem;
  --size-down-three: 0.512rem;
 
  }
}

html {
  font-size: 100%;
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: border-box;
}

body {
  background: url('/blankBackground.jpg');
  background-size: cover;
  padding: 0;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  line-height: var(--line-height);
}

a {
    text-decoration: none;
}

p {margin-bottom: 1.15rem;}

h1, h2, h3, h4, h5 {
  color: ${(props) => props.theme.color.darkAccent};
  margin: 2.75rem 0 1.05rem;
  font-family: 'Marko One', serif;
  font-weight: 400;
  line-height: 1.15;
}

h1, .text_hero {
  margin-top: 0;
  font-size: var(--size-up-five);
  text-align: center;
}

h2{
  margin-top: 0;
  font-size: var(--size-up-four);}

h3, .mobile_menu {font-size: var(--size-up-three);}

h4, .desktop_menu {font-size: var(--size-up-two);}

h5,.text_large {font-size: var(--size-up-one);}

small, .text_small {font-size: var(--size-down-one);}
`

function MyApp({ Component, pageProps, settings }) {
  const mediaBarHeight = 30
  const navBarHeight = 150
  const mobileNavBarHeight = 100
  const headerHeight = mediaBarHeight + navBarHeight + 'px'
  const mobileHeaderHeight = mediaBarHeight + mobileNavBarHeight + 'px'
  const theme = {
    ...settings.theme,
    mediaBarHeight: mediaBarHeight + 'px',
    navBarHeight: navBarHeight + 'px',
    headerHeight: headerHeight,
    mobileNavBarHeight: mobileNavBarHeight + 'px',
    mobileHeaderHeight: mobileHeaderHeight,
    tabletBreak: '600px',
    desktopBreak: '1200px',
    maxWidth: '1000px',
    bs: '0 3px 6px rgba(0,0,0,.7)',
  }

  return (
    <ThemeProvider theme={theme}>
      <HoveredItemContextProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </HoveredItemContextProvider>
    </ThemeProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)

  const query = groq`*[_type == "siteSettings"]
    {..., theme->
      {
      "color": {
        "lightShade": color.lightShade.hex,
        "lightAccent": color.lightAccent.hex,
        "main": color.main.hex,
        "darkAccent": color.darkAccent.hex,
        "darkShade": color.darkShade.hex,
      }}}[0]`
  const settings = await client.fetch(query)
  appProps.settings = settings

  return { ...appProps }
}

export default MyApp
