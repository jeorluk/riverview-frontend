import groq from 'groq'
import styled from 'styled-components'
import client from '../client'
import Layout from '../components/Layout'

import urlFor from '../util/urlFor'

const PageStyles = styled.div`
  display: grid;
  justify-items: center;

  #bannerContainer {
    display: grid;
    justify-items: center;
    position: relative;
    margin-bottom: 2rem;
    width: 100%;
    height: 0;
    background-repeat: no-repeat;
    background-size: 75% 75%;
    background-position: center;
  }

  #bannerImage {
    height: 100%;
    position: absolute;
    top: 0;
  }
`

const Index = ({ pageSettings }) => {
  const { bannerImage, mission, sidebarStart, sidebarEnd } = pageSettings
  console.log(bannerImage)
  return (
    <Layout sidebarEnd={sidebarEnd}>
      <PageStyles>
        {bannerImage && (
          <div
            id='bannerContainer'
            style={{
              backgroundImage: `url(${bannerImage.metadata.lqip})`,
              paddingTop: `clamp(1vh, calc(100% / ${bannerImage.metadata.dimensions.aspectRatio}), 50vh`,
              // paddingTop: `calc(100% / ${bannerImage.metadata.dimensions.aspectRatio})`,
            }}
          >
            <img
              id='bannerImage'
              loading='lazy'
              src={urlFor(bannerImage)
                .width(500)
                .format('jpg')
                .auto('format')
                .url()}
              alt='Banner image for Riverview Early Music'
            />
          </div>
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
    "bannerImage": bannerImage.asset->
    
  }`
  const pageSettings = await client.fetch(query)

  return {
    props: { pageSettings },
  }
}

export default Index
