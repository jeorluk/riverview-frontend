import React from 'react'
import styled from 'styled-components'
import urlFor from '../util/urlFor'
import Image from 'next/image'

const SingleEventStyles = styled.div`
  display: grid;
  grid-template-areas:
    'image'
    'info';

  .image {
    place-self: center;
    grid-area: image;
  }

  .info {
    place-self: center;
    grid-area: info;
  }

  @media (min-width: ${(props) => props.theme.tabletBreak}) {
    grid-template-areas: 'image info';
  }

  /* p {
    font-weight: bold;
  } */
`

const Event = ({ image, imageMeta, _id, date, name }) => {
  return (
    <SingleEventStyles key={_id}>
      <div className='info'>
        <h2>{name} </h2>
        <p>
          {new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZone: 'America/New_York',
          }).format(new Date(date))}
        </p>
      </div>
      <Image
        className='image'
        id='eventImage'
        src={urlFor(image).url()}
        width={200}
        height={200 / imageMeta.metadata.dimensions.aspectRatio}
        alt={name}
      />
    </SingleEventStyles>
  )
}

export default Event
