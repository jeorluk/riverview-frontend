import React from 'react'
import styled from 'styled-components'
import imageUrlBuilder from '@sanity/image-url'
import client from '../client'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const SingleArtistStyles = styled.div`
  /* width: 100%; */

  .holder {
    display: flex;
    width: 100%;
    background-size: cover;
    background-repeat: none;
  }

  &&& img {
    width: 100%;
  }

  &&& p {
    margin: 0;
  }
`

const SingleArtist = ({ artist }) => {
  return (
    <SingleArtistStyles key={artist._id}>
      <div
        className='holder'
        style={{
          backgroundImage: `url(${artist.imageMeta.metadata.lqip})`,
          // paddingTop: `calc(100% / ${artist.imageMeta.metadata.dimensions.aspectRatio})`,
        }}
      >
        {
          <img
            src={urlFor(artist.image)
              .format('jpg')
              .auto('format')
              .height(300)
              .width(300)
              .url()}
            alt={artist.name}
          />
        }
      </div>

      <p>{artist.name}</p>
    </SingleArtistStyles>
  )
}

export default SingleArtist
