import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

const FooterStyles = styled.footer`
  background: black;
  color: white;
`
const Footer = () => {
  return (
    <FooterStyles>
      <FontAwesomeIcon icon={faFacebookSquare} size='2x' />
      This is the footer content!
    </FooterStyles>
  )
}

export default Footer
