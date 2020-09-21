import React from 'react'
import YouTube from 'react-youtube'
import getYoutubeId from 'get-youtube-id'
import styled from 'styled-components'

const YoutubeStyles = styled.div`
  padding-top: 2em;
  display: grid;
  justify-items: center;
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid ${(props) => props.theme.color.darkShade};

  caption {
    max-width: 50%;
  }
`

const Youtube = (props) => {
  const { title, caption, url } = props
  const videoId = getYoutubeId(url)

  return (
    <YoutubeStyles>
      <h2>{title}</h2>
      <YouTube videoId={videoId}></YouTube>
      <caption>{caption}</caption>
    </YoutubeStyles>
  )
}

export default Youtube
