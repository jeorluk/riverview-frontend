import React from 'react'
import Cta from './Cta'
import { useImageBuilder } from '../hooks'
import styled from 'styled-components'
import SimpleBlockContent from './SimpleBlockContent'

const HeroStyles = styled.div`
  background-image: url(${(props) => props.backgroundimage});
  text-align: center;
  color: ${(props) => props.theme.color.lightShade};

  a {
    color: ${(props) => props.theme.color.darkAccent};
  }
`

const Hero = (props) => {
  const builder = useImageBuilder()
  return (
    <>
      <h2>{props.heading}</h2>
      <HeroStyles
        className='text_hero'
        backgroundimage={builder.image(props.backgroundImage).url()}
      >
        <SimpleBlockContent blocks={props.tagline} />
        {props.ctas &&
          props.ctas.map((cta) => {
            return <Cta key={cta._key} cta={cta} />
          })}
      </HeroStyles>
    </>
  )
}

export default Hero
