import App from 'next/app'
import { ThemeProvider, createGlobalStyle, css } from 'styled-components'
import { BackgroundProvider } from '../context/BackgroundContext'
import { config } from '@fortawesome/fontawesome-svg-core'
import groq from 'groq'
import client from '../client'
import urlFor from '../util/urlFor'

import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
import PageBackground from '../components/PageBackground'
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const GlobalStyle = createGlobalStyle`
html {
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
}

a {
    text-decoration: none;
}

h1{
  color: ${(props) => props.theme.color.darkAccent};
    text-align: center;
}
/*Typography Perfect Fourth*/
/* html {
    font-size: 100%;
  }

  body {
    background-color: white;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    line-height: 1.65;
    color: #333;
  }

  p {
    margin-bottom: 1.15rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 2.75rem 0 1.05rem;
    font-family: 'Marko One', serif;
    font-weight: 400;
    line-height: 1.15;
  }

  h1 {
    margin-top: 0;
    font-size: 4.209em;
  }

  h2 {
    font-size: 3.157em;
  }

  h3 {
    font-size: 2.369em;
  }

  h4,
  .text_menu {
    font-size: 1.777em;
  }

  h5 {
    font-size: 1.333em;
  }

  small,
  .text_small {
    font-size: 0.75em;
  }
 */
/*Typography Major Second*/
html {font-size: 100%;} /*16px*/

body {
  background-color: white;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  line-height: 1.65;
  color: #333;
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
  font-size: 1.802em;
}

h2 {font-size: 1.602em;}

h3, .text_menu {font-size: 1.424em;}

h4  {font-size: 1.266em;}

h5,.text_large {font-size: 1.125em;}

small, .text_small {font-size: 0.889em;}

  /*Typography Major Third*/
  @media (min-width: ${(props) => props.theme.desktopBreak}){

  html {font-size: 100%;} /*16px*/

body {
  background-color: white;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  line-height: 1.65;
  color: #333;
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
  font-size: 3.052em;
}

h2 {font-size: 2.441em;}

h3, .text_menu {font-size: 1.953em;}

h4 {font-size: 1.563em;}

h5,.text_large {font-size: 1.25em;}

small, .text_small {font-size: 0.8em;}
  }
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
