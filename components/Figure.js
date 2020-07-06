import React from 'react'
import { useImageBuilder } from '../hooks'
import styled from 'styled-components'

const FigureStyles = styled.figure`
  text-align: center;
  font-style: italic;
  img {
    max-width: 100%;
  }
`

const Figure = ({ image }) => {
  const builder = useImageBuilder()
  return (
    <>
      {image && (
        <FigureStyles>
          <img
            src={builder.image(image).auto('format').url()}
            alt={image.alt}
          />
          <figcaption>{image.caption}</figcaption>
        </FigureStyles>
      )}
    </>
  )
}

export default Figure
