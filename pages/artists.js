import React from 'react'
import groq from 'groq'
import styled from 'styled-components'
import client from '../client'
import SingleArtist from '../components/SingleArtist'
import Link from 'next/link'
import Head from 'next/head'

const ArtistsStyles = styled.div`
  text-align: center;
`

const ArtistsList = styled.div`
  margin: auto;
  padding: 1rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  justify-items: center;

  @media (min-width: ${props => props.theme.tabletBreak}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: ${props => props.theme.desktopBreak}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`

const artists = props => {
  const { artistList = [] } = props
  return (
    <ArtistsStyles>
      <Head>
        <title>Riverview | Artists</title>
        <meta
          name='description'
          content='The artists of Riverview Early Music'
        />
      </Head>
      <h1>Our artists</h1>

      <ArtistsList>
        {artistList.map(artist => (
          <React.Fragment key={artist._id}>
            <Link href='/artist/[slug]' as={`/artist/${artist.slug.current}`}>
              <a>
                <SingleArtist artist={artist} />
              </a>
            </Link>
          </React.Fragment>
        ))}
      </ArtistsList>
    </ArtistsStyles>
  )
}

export async function getStaticProps() {
  const query = groq`*[_type == "artist"]{
    _id,
    slug,
   name,
   featured,
   image,
   "imageMeta": image.asset->,
  }`
  const artistList = await client.fetch(query)

  return {
    props: { artistList },
  }
}

export default artists
