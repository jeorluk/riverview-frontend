import React from 'react'
import styled, { css } from 'styled-components'
import urlFor from '../util/urlFor'

const SingleArtistStyles = styled.div`
  /* width: 100%; */
  flex-grow: auto;
  width: 300px;
  margin: 1rem;

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

const ArtistName = styled.div(
  ({ theme }) => css`
    background-color: black;
    color: white;
    font-size: 2rem;
  `
)

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
      <ArtistName>{artist.name}</ArtistName>
    </SingleArtistStyles>
  )
}

export default SingleArtist
