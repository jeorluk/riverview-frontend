import React from 'react'
import styled from 'styled-components'
import SocialLinks from '../SocialLinks'
import { SubscribeButton, DonateButton } from '../Buttons'

const MediaBarStyles = styled.div`
  height: ${(props) => props.theme.mediaBarHeight};
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-end;
  background-color: ${(props) => props.theme.color.main};
  a {
    color: ${(props) => props.theme.color.darkShade};
  }
`
const MediaBar = () => {
  return (
    <MediaBarStyles>
      <SocialLinks />
      <SubscribeButton invert />
      <DonateButton invert />
    </MediaBarStyles>
  )
}

export default MediaBar
