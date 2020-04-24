import React from 'react'
import styled from 'styled-components'

const BackgroundStyle = styled.div`
  margin: 0;
  padding: 0;
  height: 100vh;
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
    url(${(props) => props.image}); */
  background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75));
  background-size: cover;
  /* background-position-x: ${(props) => `${props.offset.x * 100}%`}; */
  /* background-position-x: ${(props) => `${props.offset.y * 100}%`}; */
`

const PageBackground = ({ image, offset, children }) => {
  return (
    // <BackgroundStyle image={image} offset={offset}>
    <BackgroundStyle>{children}</BackgroundStyle>
  )
}

export default PageBackground
