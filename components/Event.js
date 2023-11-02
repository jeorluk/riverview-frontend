import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import styled from 'styled-components'
import urlFor from '../util/urlFor'
import Image from 'next/image'

const SingleEventStyles = styled.div`
  display: grid;

  grid-template-areas:
    'image'
    'details';

  .image {
    place-self: center;
    grid-area: image;
  }

  .loc_time {
    p {
      color: ${({ theme }) => theme.color.lightAccent};
      margin: 0;
    }
    a {
      color: ${({ theme }) => theme.color.lightAccent};
    }
    a:hover {
      color: ${({ theme }) => theme.color.darkShade};
    }
  }

  .details {
    place-self: center;
    grid-area: details;
  }

  @media (min-width: ${(props) => props.theme.tabletBreak}) {
    grid-template-areas: 'image details';
  }
`

const Event = (props) => {
  const {
    image,
    imageMeta,
    _id,
    date,
    name,
    location = '',
    address = '',
    description,
    ticketLink,
  } = { ...props }
  return (
    <SingleEventStyles key={_id}>
      <div className='details'>
        <h2>{name} </h2>
        <div className='loc_time text_large'>
          <p>
            <strong>Date: </strong>
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
          <p>
            <a
              href={`http://maps.google.com/maps?q=${address}`}
              target='_blank'
            >
              <strong>Location: </strong>
              {location}, {address}
            </a>
          </p>
          <p>
            <a href={ticketLink} target='_blank'>
              <strong>Info/Tickets: </strong>
              {ticketLink}
            </a>
          </p>
        </div>
        <BlockContent blocks={description} />
      </div>
      <Image
        className='image'
        id='eventImage'
        src={urlFor(image).url()}
        objectFit='contain'
        width={200}
        height={200 / imageMeta.metadata.dimensions.aspectRatio}
        alt={name}
      />
    </SingleEventStyles>
  )
}

export default Event
