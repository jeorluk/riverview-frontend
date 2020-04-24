import App from 'next/app'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { config } from '@fortawesome/fontawesome-svg-core'
import groq from 'groq'
import client from '../client'

import imageUrlBuilder from '@sanity/image-url'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
import PageBackground from '../components/PageBackground'
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

function MyApp({ Component, pageProps, settings }) {
  console.log(settings)
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

    img: urlFor(settings.banner).format('jpg').auto('format').url(),
    offset: settings.banner.hotspot,
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
     font-family: 'montserrat', monospace;
     /* overflow-x: hidden; */
     font-weight: normal;
     font-style: normal;
     font-size: 1.5rem;
     background: ${theme.primaryLight};
     background: transparent;
     color: ${theme.textDark};
     padding: 0;
     margin: 0;
   }

   a {
       text-decoration: none;
       color: ${theme.textDark};                          
   }
`

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageBackground>
        <Component {...pageProps} />
      </PageBackground>
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

  const query = groq`*[_type == "siteSettings"]{...}[0]`
  const settings = await client.fetch(query)
  appProps.settings = settings

  return { ...appProps }
}

export default MyApp
