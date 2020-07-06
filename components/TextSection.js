import React from 'react'
import SimpleBlockContent from './SimpleBlockContent'
import styled from 'styled-components'

const TextStyles = styled.div`
  h2 {
    text-align: center;
  }
`
const TextSection = ({ heading, text }) => {
  return (
    <TextStyles>
      <h2>{heading}</h2>
      <SimpleBlockContent blocks={text} />
    </TextStyles>
  )
}

export default TextSection
