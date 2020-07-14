import React from 'react'
import styled from 'styled-components'
import BlockContent from '@sanity/block-content-to-react'
import { useImageBuilder } from '../hooks'

const ArtistModalStyles = styled.div`
  padding: 2rem;
  display: flex;
  align-content: center;
  justify-content: center;
  position: absolute;
  min-height: 100vh;
  width: 100vw;
  z-index: 1000;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);

  @media (max-width: ${(props) => props.theme.tabletBreak}) {
    padding: 0;
  }
`
const Inner = styled.div`
  border-radius: 1rem;
  box-shadow: ${(props) => props.theme.bs};
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;

  justify-items: center;
  margin: auto;
  background: ${(props) => props.theme.color.lightShade};
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};

  @media (max-width: ${(props) => props.theme.tabletBreak}) {
    height: 100vh;
    border-radius: 0;
  }
  #artistImage {
    border-radius: 50%;
    box-shadow: ${(props) => props.theme.bs};
  }

  button {
    border: 2px solid green;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  img {
    display: block;
    margin: auto;
    max-width: 100%;
  }
`

const ArtistModal = ({ artist, setSelected }) => {
  const builder = useImageBuilder()
  const { name, bio = '', image, featured, instruments, _id } = artist
  return (
    <ArtistModalStyles>
      <Inner>
        <button onClick={() => setSelected(false)}>Close</button>
        <h1>{name}</h1>
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
      </Inner>
    </ArtistModalStyles>
  )
}

export default ArtistModal
