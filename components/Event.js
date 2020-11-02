import React from 'react'
import styled from 'styled-components'
import urlFor from '../util/urlFor'
import Image from 'next/image'

const SingleEventStyles = styled.div`
display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: top;
  justify-items: start;



  p{
 font-weight: bold;
  }
`

const Event = ({image, imageMeta, _id, date, name}) => {
console.log(imageMeta)
  return (
    <SingleEventStyles key={_id}>
      <p className="text_large">
      
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
  <Image
  id="eventImage"
    src={urlFor(image).url()}
    width={400}
    height={400/imageMeta.metadata.dimensions.aspectRatio}
    alt={name}
  />
    </SingleEventStyles>
  )
}

export default Event
