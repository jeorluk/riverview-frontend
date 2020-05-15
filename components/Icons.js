import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookSquare,
  faYoutubeSquare,
} from '@fortawesome/free-brands-svg-icons'

const Icon = styled.div`
  margin: 2px;
  color: ${(props) => props.theme.textLight};
`

export const FacebookButton = () => {
  return (
    <Icon>
      <FontAwesomeIcon
        onClick={() => {
          alert('Go to facebook')
        }}
        icon={faFacebookSquare}
        size='2x'
      />
    </Icon>
  )
}

export const YouTubeButton = () => {
  return (
    <Icon>
      <FontAwesomeIcon
        onClick={() => {
          alert('Go to Youtube')
        }}
        icon={faYoutubeSquare}
        size='2x'
      />
    </Icon>
  )
}
