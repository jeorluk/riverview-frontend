import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookSquare,
  faYoutubeSquare,
} from '@fortawesome/free-brands-svg-icons'

const Styles = styled.p`
  font-variant: small-caps;
  line-height: 2rem;
  margin: 0;
  a {
    padding: 2px 0.5em;
    /* font-size: 1.5em; */
  }
`

const SocialLinks = () => {
  return (
    <Styles>
      <a
        href='https://www.facebook.com/RiverveiwEarlyMusic'
        target='blank'
        aria-label='Facebook'
      >
        <FontAwesomeIcon icon={faFacebookSquare} />
      </a>
      <a
        href='https://www.youtube.com/channel/UCsD69-69f2TXwy6rtXcnQcA'
        target='blank'
        aria-label='YouTube'
      >
        <FontAwesomeIcon icon={faYoutubeSquare} />
      </a>
    </Styles>
  )
}

export default SocialLinks
