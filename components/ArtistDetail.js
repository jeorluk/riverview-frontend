import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import styled from 'styled-components'
import { useImageBuilder } from '../hooks'
import Image from 'next//legacy/image'

const ArtistStyles = styled.div`
  a {
    color: ${(props) => props.theme.color.darkAccent};
    font-weight: bold;
  }
`

const ArtistCard = styled.div`
  max-width: 1200px;
  padding: 0;

  img {
    display: block;
    margin: auto;
    max-width: 100%;
  }

  #artistImage {
    display: block;
    max-width: 80%;
    margin: auto;
    transition: opacity 1s ease-in;
    border-radius: 50%;

    @media (min-width: ${(props) => props.theme.tabletBreak}) {
      margin-right: 60px;
      float: left;
      shape-outside: circle();
    }
  }
`

const ArtistImage = styled(Image)`
  div {
    display: block;
    height: 200px;
    width: 200px;
    background-color: purple;
    margin: auto;
    transition: opacity 1s ease-in;
    border-radius: 50%;

    @media (min-width: ${(props) => props.theme.tabletBreak}) {
      margin-right: 60px;
      float: left;
      shape-outside: circle();
      overflow: hidden;
    }
  }
`

const ArtistDetail = (props) => {
  const { name, bio = '', image, featured, instruments, _id } = props
  const builder = useImageBuilder()
  return (
    <ArtistStyles>
      <h1>{name}</h1>

      <ArtistCard>
        <img
          id='artistImage'
          src={builder.image(image).height(200).width(200).url()}
          alt={name}
        />
        <div className='details'>
          {bio && <BlockContent blocks={bio} />}
          {instruments &&
            instruments.map((instrument) => (
              <div key={instrument.title}>Instruments: {instrument.title}</div>
            ))}
        </div>
      </ArtistCard>
    </ArtistStyles>
  )
}

export default ArtistDetail
