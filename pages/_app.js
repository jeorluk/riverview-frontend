import App from 'next/app'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { BackgroundProvider } from '../context/BackgroundContext'
import { config } from '@fortawesome/fontawesome-svg-core'
import groq from 'groq'
import client from '../client'
import urlFor from '../util/urlFor'

import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
import PageBackground from '../components/PageBackground'
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'montserrat';
  src: url('/Montserrat-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
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
  font-family: 'montserrat', monospace;
  /* overflow-x: hidden; */
  font-weight: normal;
  font-style: normal;
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
}

a {
    text-decoration: none;
}
`

function MyApp({ Component, pageProps, settings }) {
  console.log(settings)

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
