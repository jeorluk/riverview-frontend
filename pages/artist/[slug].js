import { useRouter } from 'next/router'
import Head from 'next/head'
import styled from 'styled-components'
import groq from 'groq'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../client'
import Link from 'next/link'

const ArtistStyles = styled.div`
  a {
    font-size: 2rem;
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

  @media (min-width: ${props => props.theme.tabletBreak}) {
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
const query = groq`*[_type == "artist" && slug.current == $slug]{
  _id,
 name,
 bio,
 featured,
 "image": image.asset->,
 "instruments": instruments[]->{title}
}[0]`

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const artistPage = ({ artist }) => {
  const router = useRouter()

  const { name, bio = [], image, featured, instruments, _id } = artist
  console.log(instruments)
  return (
    <ArtistStyles>
      <Head>
        <title>Riverview Early Music | {name}</title>
      </Head>
      <Link href='/artists'>
        <h1>{`◀️${name}`}</h1>
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
          <h2>{name || 'No name'}</h2>
          {bio && <BlockContent blocks={bio} />}
          {instruments &&
            instruments.map(instrument => (
              <div key={instrument.title}>{instrument.title}</div>
            ))}
        </div>
      </ArtistCard>
    </ArtistStyles>
  )
}

artistPage.getInitialProps = async ctx => {
  const { slug = '' } = ctx.query
  return {
    artist: await client.fetch(query, { slug }),
  }
}

export default artistPage
