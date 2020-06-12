import groq from 'groq'
import client from '../client'
import styled from 'styled-components'
import RiverviewLogo from '../public/RiverviewLogo.svg'
import Link from 'next/link'
import Layout from '../components/Layout'
import urlFor from '../util/urlFor'

const PageStyles = styled.div`
  display: grid;
  justify-items: center;
  #banner {
    margin-bottom: 2rem;
    max-width: 100%;
    max-height: 50vh;
  }
`

const Index = ({ pageSettings }) => {
  console.log(pageSettings)
  const { bannerImage, mission } = pageSettings
  return (
    <Layout>
      <PageStyles>
        {bannerImage && (
          <img id='banner' lazy src={urlFor(bannerImage).width(1000).url()} />
        )}
        <h1>Our Mission</h1>
        <div>{mission}</div>
      </PageStyles>
    </Layout>
  )
}

export async function getStaticProps() {
  const query = groq`*[_type == "homePage"][0]{
    ...,
    
  }`
  const pageSettings = await client.fetch(query)

  return {
    props: { pageSettings },
  }
}

export default Index
