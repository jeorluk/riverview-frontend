import React from 'react'
import YouTube from 'react-youtube'
import getYoutubeId from 'get-youtube-id'
import styled from 'styled-components'

const YoutubeStyles = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
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
