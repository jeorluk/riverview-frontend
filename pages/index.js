import groq from 'groq'
import client from '../client'
import styled from 'styled-components'
import RiverviewLogo from '../public/RiverviewLogo.svg'
import Link from 'next/link'
import Layout from '../components/Layout'

const LandingStyle = styled.div`
  /* display: grid; */
  text-align: center;
  color: ${(props) => props.theme.primaryLight};
  margin: 0;
  padding: 0;
  /* border: 2px solid yellow; */
  height: 100vh;
  /* width: 100%; */
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
    url(${(props) => props.img}); */
  /* background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
    url(${(props) => props.theme.img}) fixed no-repeat; */
  /* background-size: cover; */
  /* background-position-x: ${(props) => `${props.theme.offset.x * 100}%`}; */
  /* background-position-y: ${(props) => `${props.theme.offset.y * 100}%`}; */

  svg {
    display: block;
    fill: ${(props) => props.theme.primaryLight};
    margin: auto;
    height: 50%;
    width: 600px;
    max-width: 90%;
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
  return (
    <Layout>
      <h1>This is the main page.</h1>
    </Layout>
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
