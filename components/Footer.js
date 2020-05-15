import React from 'react'
import styled from 'styled-components'
import { SubscribeButton, DonateButton } from './Buttons'
import SocialLinks from './SocialLinks'

const FooterStyles = styled.footer`
  background: ${({ theme }) => theme.color.darkShade};
  color: ${({ theme }) => theme.color.main};

  a {
    color: ${({ theme }) => theme.color.lightShade};
  }
`
const Footer = () => {
  return (
    <FooterStyles>
      <SubscribeButton />
      <DonateButton />
      <SocialLinks />
    </FooterStyles>
  )
}

export default Footer
