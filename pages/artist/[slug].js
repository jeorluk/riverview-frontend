import { useRouter } from 'next/router'
import Head from 'next/head'
import styled from 'styled-components'
import groq from 'groq'
import BlockContent from '@sanity/block-content-to-react'
import client from '../../client'
import Link from 'next/link'
import Layout from '../../components/Layout'
import urlFor from '../../util/urlFor'

const ArtistStyles = styled.div`
  a {
    /* font-size: 2rem; */
    padding: 1rem;
  }
`

const ArtistCard = styled.div`
  max-width: 1200px;
  display: grid;
  grid-gap: 1rem;
  align-content: flex-start;
  padding: 0;
  grid-template-columns: 1fr;

  @media (min-width: ${(props) => props.theme.tabletBreak}) {
    padding: 1rem;
    grid-template-columns: 1fr 1fr;
  }

  .imageCard {
    position: relative;
    margin: 0;
    width: 100%;
    background: #000;
    background-size: cover;
    background-repeat: no-repeat;
  }

  img {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    transition: opacity 1s ease-in;
  }
`

const artistPage = ({ artist }) => {
  const { name, bio = [], image, featured, instruments, _id } = artist
  return (
    <Layout title={name}>
      <ArtistStyles>
        <Head>
          <meta name='description' content={`Artist information for ${name}`} />
          <title>Riverview | {name}</title>
        </Head>
        <Link href='/artists'>
          <h1>{`<--`}</h1>
        </Link>

        <ArtistCard>
          <div
            className='imageCard'
            style={{
              backgroundImage: `url(${image.metadata.lqip})`,
              paddingTop: `calc(100 / ${image.metadata.dimensions.aspectRatio})`,
            }}
          >
            {<img src={urlFor(image).width(400)} alt={name} />}
          </div>

          <div className='details'>
            {bio && <BlockContent blocks={bio} />}
            {instruments &&
              instruments.map((instrument) => (
                <div key={instrument.title}>{instrument.title}</div>
              ))}
          </div>
        </ArtistCard>
      </ArtistStyles>
    </Layout>
  )
}

export async function getStaticPaths() {
  const query = groq`*[_type=="artist"]{"slug": slug.current}`
  const artistList = await client.fetch(query)
  const paths = artistList.map((artist) => ({
    params: { slug: artist.slug },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const query = groq`*[_type == "artist" && slug.current == $slug]{
  _id,
 name,
 bio,
 featured,
 "image": image.asset->,
 "instruments": instruments[]->{title}
}[0]`

  const { slug = '' } = params
  const artist = await client.fetch(query, { slug })

  return {
    props: { artist },
  }
}

export default artistPage
