import React from 'react'
import getYoutubeId from 'get-youtube-id'
import styled from 'styled-components'
import ReactPlayer from 'react-player/youtube'

const YoutubeStyles = styled.div`
  padding-top: 2em;
  display: grid;
  justify-items: center;
  width: 100%;
  margin: 0 auto;
  grid-template-columns: minmax(0, 1fr);
  padding-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.color.darkShade};

  .player-container {
    position: relative;
    max-width: 100%;
    height: 0;
    padding-top: 56.25%;
    width: 100%;
  }
  .player-container > div {
    max-width: 100%;
    max-height: 100%;
  }
  iframe {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  @media (min-width: ${(props) => props.theme.desktopBreak}) {
    caption {
      max-width: 50%;
    }
  }
`

const Youtube = (props) => {
  const { title, caption, url } = props
  const videoId = getYoutubeId(url)

  return (
    <YoutubeStyles>
      <h2>{title}</h2>
      <div className='player-container'>
        <ReactPlayer url={url} />
      </div>
      <caption>{caption}</caption>
    </YoutubeStyles>
  )
}

export default Youtube
