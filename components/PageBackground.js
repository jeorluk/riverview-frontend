import React from 'react'
import styled from 'styled-components'

const BackgroundStyle = styled.div`
  position: fixed;
  margin: 0;
  padding: 0;
  height: 100vh;
  background-image: url(${(props) => props.theme.img});
  background-size: cover;
  background-position-x: ${(props) => `${props.theme.offset.x * 100}%`};
  background-position-x: ${(props) => `${props.theme.offset.y * 100}%`};
`

const PageBackground = ({ children }) => {
  return <BackgroundStyle>{children}</BackgroundStyle>
}

export default PageBackground
