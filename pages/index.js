import groq from 'groq'
import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
import styled from 'styled-components'
import RiverviewLogo from '../public/RiverviewLogo.svg'
import Link from 'next/link'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const LandingStyle = styled.div`
  /* display: grid; */
  text-align: center;
  color: ${(props) => props.theme.primaryLight};
  margin: 0;
  padding: 0;
  /* border: 2px solid yellow; */
  height: 100vh;
  /* width: 100%; */
  background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
    url(${(props) => props.img});
  background-size: cover;
  background-position-x: ${(props) => `${props.offset.x * 100}%`};
  background-position-x: ${(props) => `${props.offset.y * 100}%`};

  svg {
    display: block;
    fill: ${(props) => props.theme.primaryLight};
    margin: auto;
    height: 50%;
    width: 50%;
  }

  a {
    font-size: 2rem;
    margin: 2rem auto;
    padding: 2rem;
    color: ${(props) => props.theme.primaryLight};
    border: 2px solid ${(props) => props.theme.primaryLight};
    border-radius: 5px;
  }
`

const Index = ({ settings }) => {
  console.log(settings)
  return (
    <LandingStyle
      img={urlFor(settings.banner).format('jpg').auto('format').url()}
      offset={settings.banner.hotspot}
    >
      <RiverviewLogo />
      <Link href='./about'>
        <a>FIND OUT MORE</a>
      </Link>
      {/* <h1>This is the home page.</h1>
      <ul>
        <li>A banner at the top that scrolls </li>
        <li>A list of concerts </li>
        <li>Special announcements</li>
      </ul> */}
    </LandingStyle>
  )
}

export async function getStaticProps() {
  const query = groq`*[_type == "siteSettings"]{
...

  }[0]`
  const settings = await client.fetch(query)

  return {
    props: { settings },
  }
}

export default Index
