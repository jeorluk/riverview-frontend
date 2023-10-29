import React from 'react'

import SimpleBlockContent from './SimpleBlockContent'
import styled from 'styled-components'
import Figure from './Figure'
import Cta from './Cta'

const ImageSectionStyles = styled.div`
  max-width: 100%;
`

const ImageSection = (props) => {
  const { heading, text, image, imageMeta, cta } = props
  return (
    <ImageSectionStyles>
      <h2>{heading}</h2>
      <SimpleBlockContent blocks={text} />
      <Figure image={image} imageMeta={imageMeta} />
      <Cta cta={cta} />
    </ImageSectionStyles>
  )
}

export default ImageSection
