import React from 'react'
import groq from 'groq'
import styled from 'styled-components'
import client from '../client'
import SingleArtist from '../components/SingleArtist'
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'

const ArtistsStyles = styled.div`
  text-align: center;
`

const ArtistsList = styled(motion.div)`
  margin: auto;
  padding: 1rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  justify-items: center;

  @media (min-width: ${(props) => props.theme.tabletBreak}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: ${(props) => props.theme.desktopBreak}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

const artists = (props) => {
  const { artistList = [] } = props
  return (
    <Layout>
      <ArtistsStyles>
        <Head>
          <title>Riverview | Artists</title>
          <meta
            name='description'
            content='The artists of Riverview Early Music'
          />
        </Head>
        <h1>Our artists</h1>

        <ArtistsList variants={container} initial='hidden' animate='show'>
          {artistList.map((artist) => (
            <motion.div variants={item} key={artist._id}>
              <Link href='/artist/[slug]' as={`/artist/${artist.slug.current}`}>
                <a>
                  <SingleArtist artist={artist} />
                </a>
              </Link>
            </motion.div>
          ))}
        </ArtistsList>
      </ArtistsStyles>
    </Layout>
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
