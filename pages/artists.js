import React, { useState } from 'react'
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

const artists = ({ pageSettings }) => {
  const { title, intro, artistList = [] } = pageSettings
  const [hoveredArtist, setHoveredArtist] = useState(0)

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
        <h1>{title}</h1>
        <p>{intro}</p>
        <ArtistsList variants={container} initial='hidden' animate='show'>
          {artistList.map((artist) => (
            <motion.div variants={item} key={artist._id}>
              <SingleArtist
                artist={artist}
                hoveredArtist={hoveredArtist}
                setHoveredArtist={setHoveredArtist}
              />
            </motion.div>
          ))}
        </ArtistsList>
      </ArtistsStyles>
    </Layout>
  )
}

export async function getStaticProps() {
  const query = groq`*[_type == "artistsPage"][0]{
    ...,
    artistList[]-> {
      _id,
    slug,
   name,
   intro,
   featured,
   image,
   "imageMeta": image.asset->,
    }
  }`

  const pageSettings = await client.fetch(query)

  return {
    props: { pageSettings },
  }
}

export default artists
