import Head from 'next/head'
import groq from 'groq'
import client from '../../client'
import Layout from '../../components/Layout'
import ArtistDetail from '../../components/ArtistDetail'

const ArtistPage = ({ artist }) => {
  const { name, bio = '', image, featured, instruments, _id } = artist
  return (
    <Layout>
      <Head>
        <meta
          name='description'
          content={`${name} is an artist with Riverview Early Music`}
        />
        <title>Riverview | {name}</title>
      </Head>
      <ArtistDetail {...artist} />
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

export default ArtistPage
