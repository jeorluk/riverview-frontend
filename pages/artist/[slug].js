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
  /* display: grid; */
  /* grid-gap: 1rem; */
  /* align-content: flex-start; */
  padding: 0;
  /* grid-template-columns: 1fr; */
/* 
  @media (min-width: ${(props) => props.theme.tabletBreak}) {
    padding: 1rem;
    grid-template-columns: 1fr 1fr;
  } */

  #imageCard {
    position: relative;
    margin: 0;
    width: 100%;
    background: #000;
    background-size: cover;
    background-repeat: no-repeat;
  }
img{display:block;margin:auto;}
  #artistImage {
    display: block;
    max-width: 80%;
    margin: auto;
    /* position: relative; */
    /* top: 0; */
    /* left: 0; */
    /* width: 100%; */
    transition: opacity 1s ease-in;
    border-radius: 50%; 

  @media (min-width: ${(props) => props.theme.tabletBreak}) {
    margin-right: 60px;
    float: left;
shape-outside: circle();
  } 
  }
`

const artistPage = ({ artist }) => {
  const { name, bio = '', image, featured, instruments, _id } = artist
  console.log(artist)
  return (
    <Layout title={name}>
      <ArtistStyles>
        <Head>
          <meta name='description' content={`Artist information for ${name}`} />
          <title>Riverview | {name}</title>
        </Head>
        <Link href='/artists'>
          <h1>{name}</h1>
        </Link>

        <ArtistCard>
          {/* <div
            className='imageCard'
            style={{
              backgroundImage: `url(${image.metadata.lqip})`,
              paddingTop: `calc(100 / ${image.metadata.dimensions.aspectRatio})`,
            }}
          > */}
          {
            <img
              id='artistImage'
              src={urlFor(image).height(200).width(200).url()}
              alt={name}
            />
          }
          {/* </div> */}

          <div className='details'>
            {bio && <BlockContent blocks={bio} />}
            {instruments &&
              instruments.map((instrument) => (
                <div key={instrument.title}>
                  Instruments: {instrument.title}
                </div>
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
  const query = groq`*[_type == "artist" && slug.current == $slug][0]{
    _id,
    name,
    featured,
   bio[]{..., "asset": asset->},
   image,
    "imageMeta": image.asset->,
    "instruments": instruments[]->{title}
  }`
  const { slug = '' } = params
  const artist = await client.fetch(query, { slug })

  return {
    props: { artist },
  }
}

export default artistPage
