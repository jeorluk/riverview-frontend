import React from 'react'
import Cta from './Cta'
import { useImageBuilder } from '../hooks'
import styled from 'styled-components'
import SimpleBlockContent from './SimpleBlockContent'

const HeroStyles = styled.div`
  background-image: ${(props) =>
    props.$backgroundimage ? url(props.$backgroundimage) : 'none'};
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
      {props.heading && <h2>{props.heading}</h2>}
      <HeroStyles
        className='text_hero'
        $backgroundimage={
          props.backgroundImage
            ? builder.image(props.backgroundImage).url()
            : false
        }
      >
        <SimpleBlockContent blocks={props.tagline} />
        {props.ctas &&
          props.ctas.map((cta) => {
            return <Cta key={cta._key} cta={cta} />
          })}
      </HeroStyles>
    </>
    // <h2>This is a hero</h2>
  )
}

export default Hero
