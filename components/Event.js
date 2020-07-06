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

const Event = (props) => {
  return (
    <SingleEventStyles key={props._id}>
      <img
        src={urlFor(props.image).width(200).fit('max').url()}
        alt={props.name}
      />

      {new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'America/New_York',
      }).format(new Date(props.date))}
    </SingleEventStyles>
  )
}

export default Event
