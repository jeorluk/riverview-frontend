import React from 'react'
import styled from 'styled-components'
import urlFor from '../util/urlFor'

const SingleEventStyles = styled.div`
  /* width: 100%;
  display: grid;
  grid-template-columns: 2fr 3fr;
  justify-items: start;

  &&& img {
    width: 100%;
    object-fit: fill;
    margin: 0;
  }
  &&& h2 {
    margin: 0;
  } */
`

const SingleEvent = ({ event }) => {
  return (
    <SingleEventStyles key={event._id}>
      {event.image && (
        <img
          src={urlFor(event.image).width(200).fit('max').url()}
          alt={event.name}
        />
      )}

      {new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'America/New_York',
      }).format(new Date(event.date))}
    </SingleEventStyles>
  )
}

export default SingleEvent
