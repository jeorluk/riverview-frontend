import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import styled from 'styled-components'
import { useImageBuilder } from '../hooks'

const ArtistStyles = styled.div`
  a {
    /* font-size: 2rem; */
    padding: 1rem;
  }
`

const ArtistCard = styled.div`
  max-width: 1200px;
  /* display: grid; */
  /* grid-gap: 1rem; */
  /* align-content: flex-start; */
  padding: 0;
  /* grid-template-columns: 1fr; */
/* 
  @media (min-width: ${(props) => props.theme.tabletBreak}) {
    padding: 1rem;
    grid-template-columns: 1fr 1fr;
  } */

  #imageCard {
    position: relative;
    margin: 0;
    width: 100%;
    background: #000;
    background-size: cover;
    background-repeat: no-repeat;
  }
img{display:block;margin:auto;max-width: 100%;}
  #artistImage {
    display: block;
    max-width: 80%;
    margin: auto;
    /* position: relative; */
    /* top: 0; */
    /* left: 0; */
    /* width: 100%; */
    transition: opacity 1s ease-in;
    border-radius: 50%; 

  @media (min-width: ${(props) => props.theme.tabletBreak}) {
    margin-right: 60px;
    float: left;
shape-outside: circle();
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
        {/* <div
        className='imageCard'
        style={{
          backgroundImage: `url(${image.metadata.lqip})`,
          paddingTop: `calc(100 / ${image.metadata.dimensions.aspectRatio})`,
        }}
      > */}
        {
          <img
            id='artistImage'
            src={builder.image(image).height(200).width(200).url()}
            alt={name}
          />
        }
        {/* </div> */}

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