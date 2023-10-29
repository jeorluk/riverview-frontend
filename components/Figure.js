import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import urlFor from '../util/urlFor'

const FigureStyles = styled.figure`
  text-align: center;
  font-style: italic;
  img {
    max-width: 100%;
  }
`

const Figure = (props) => {
  const { image, imageMeta } = { ...props }
  return (
    <>
      {image && (
        <FigureStyles>
          <Image
            src={urlFor(image).url()}
            objectFit='contain'
            width={800}
            height={800 / imageMeta.metadata.dimensions.aspectRatio}
            alt={image.alt}
          />
          <figcaption>{image.caption}</figcaption>
        </FigureStyles>
      )}
    </>
  )
}

export default Figure
