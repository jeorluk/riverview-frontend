import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import styled from 'styled-components'
import urlFor from '../util/urlFor'
import Image from 'next/legacy/image'

const SingleEventStyles = styled.div`
  h2 {
    margin: 0;
    /* text-align: center; */
  }
  /* display: grid; */
  /* max-width: 100%; */
  /* grid-template-columns: 1fr; */
  grid-template-areas:
    'image'
    'details';

  .image {
    place-self: center;
    grid-area: image;
  }

  .loc_time {
    p {
      /* display: block; */
      color: ${({ theme }) => theme.color.lightAccent};
      margin: 0;
    }
    a {
      /* display: block; */
      color: ${({ theme }) => theme.color.lightAccent};
    }
    a:hover {
      color: ${({ theme }) => theme.color.darkShade};
    }
  }

  .details {
    place-self: center;
    grid-area: details;
    /* text-align: justify; */
  }

  @media (min-width: ${(props) => props.theme.tabletBreak}) {
    grid-template-areas: 'image details';
    /* h2 {
      text-align: left;
    } */
    /* .details {
      text-align: left;
    } */
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
        <div className='loc_time text_large'>
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
            <h2>{name} </h2>
          </p>
          <p>
            <a
              href={`http://maps.google.com/maps?q=${address}`}
              target='_blank'
            >
              {location}
              <br />
              {address}
            </a>
          </p>
          <p>
            <a href={ticketLink} target='_blank'>
              <strong>Click here for more information/tickets </strong>
            </a>
          </p>
        </div>
        <BlockContent blocks={description} />
      </div>
      {image && (
        <Image
          className='image'
          id='eventImage'
          src={urlFor(image).url()}
          objectFit='contain'
          width={200}
          height={200 / imageMeta.metadata.dimensions.aspectRatio}
          alt={name}
        />
      )}
    </SingleEventStyles>
  )
}

export default Event
