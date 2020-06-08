import App from 'next/app'
import { ThemeProvider, createGlobalStyle, css } from 'styled-components'
import { BackgroundProvider } from '../context/BackgroundContext'
import { config } from '@fortawesome/fontawesome-svg-core'
import groq from 'groq'
import client from '../client'

import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const GlobalStyle = createGlobalStyle`
:root{
  /*Type sizes (Major Second for mobile) */
  --size-up-five: 1.802em;
  --size-up-four: 1.602em;
  --size-up-three: 1.424em;
  --size-up-two: 1.266em;
  --size-up-one: 1.125em;
  --size-down-one: 0.889em;
  --size-down-two: 0.79em;
  --size-down-three: 0.702em;

  
  
  @media (min-width: ${(props) => props.theme.tabletBreak}){
  /*Type sizes (Minor Third for tablet) */
  --size-up-five: 2.488em;
  --size-up-four: 2.074em;
  --size-up-three: 1.728em;
  --size-up-two: 1.44em;
  --size-up-one: 1.2em;
  --size-down-one: 0.833em;
  --size-down-two: 0.694em;
  --size-down-three: 0.579em;
 
  }
  @media (min-width: ${(props) => props.theme.desktopBreak}){
  /*Type sizes (Major Third for desktop) */
  --size-up-five: 3.052em;
  --size-up-four: 2.441em;
  --size-up-three: 1.953em;
  --size-up-two: 1.563em;
  --size-up-one: 1.25em;
  --size-down-one: 0.8em;
  --size-down-two: 0.64em;
  --size-down-three: 0.512em;
 
  }
}

html {
  font-size: 100%;
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}

body {
  background: url('/blankBackground.jpg');
  background-size: cover;
  padding: 0;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  line-height: 1.65;
}

a {
    text-decoration: none;
}

p {margin-bottom: 1.15rem;}

h1, h2, h3, h4, h5 {
  margin: 2.75rem 0 1.05rem;
  font-family: 'Marko One', serif;
  font-weight: 400;
  line-height: 1.15;
}

h1 {
  margin-top: 0;
  font-size: var(--size-up-five);
  color: ${(props) => props.theme.color.darkAccent};
  text-align: center;
}

h2 {
  color: ${(props) => props.theme.color.darkAccent};
  margin-top: 0;
  font-size: var(--size-up-four);}

h3, .text_menu {font-size: var(--size-up-three);}

h4 {font-size: var(--size-up-two);}

h5,.text_large {font-size: var(--size-up-one);}

small, .text_small {font-size: var(--size-down-one);}
`

function MyApp({ Component, pageProps, settings }) {
  return (
    <ThemeProvider theme={settings.theme}>
      <BackgroundProvider value={true}>
        <GlobalStyle />
        <Component {...pageProps} />
      </BackgroundProvider>
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

  // const query = groq`*[_type == "siteSettings"]{..., theme->}[0]`
  const query = groq`*[_type == "siteSettings"]
    {..., theme->
      {..., 
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
