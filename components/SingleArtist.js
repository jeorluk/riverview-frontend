import React from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import urlFor from '../util/urlFor'
import { motion } from 'framer-motion'

const SingleArtistStyles = styled(motion.div)`
  overflow: hidden;
  position: relative;
  /* width: 100%; */
  flex-grow: auto;
  width: 300px;
  margin: 1rem;

  .holder {
    display: flex;
    width: 100%;
    background-size: cover;
    background-repeat: none;
  }

  &&& img {
    width: 100%;
  }

  &&& p {
    margin: 0;
  }
`

const ArtistName = styled.div(
  ({ theme }) => css`
    pointer-events: none;
    position: relative;
    z-index: 2;
    background-color: ${theme.color.darkShade};
    color: ${theme.color.lightShade};
    font-size: 2rem;
  `
)

const Mask = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${(props) => props.theme.color.darkShade};
  color: ${(props) => props.theme.color.lightShade};
`
const maskVariants = {
  visible: { opacity: 0.9, y: 0 },
  hidden: { opacity: 0, y: '80%' },
}

const SingleArtist = ({ artist, hoveredArtist, setHoveredArtist }) => {
  const isHovered = artist._id === hoveredArtist
  return (
    <SingleArtistStyles
      key={artist._id}
      intitial={isHovered ? 'visible' : 'hidden'}
      onHoverStart={() => setHoveredArtist(artist._id)}
      onHoverEnd={() => setHoveredArtist(0)}
      onTap={() => setHoveredArtist(artist._id)}
      animate={isHovered ? 'visible' : 'hidden'}
    >
      <Link href='/artist/[slug]' as={`/artist/${artist.slug.current}`}>
        <a>
          <Mask variants={maskVariants}>{artist.intro}</Mask>
        </a>
      </Link>
      <div
        className='holder'
        style={{
          backgroundImage: `url(${artist.imageMeta.metadata.lqip})`,
          // paddingTop: `calc(100% / ${artist.imageMeta.metadata.dimensions.aspectRatio})`,
        }}
      >
        {
          <img
            src={urlFor(artist.image)
              .format('jpg')
              .auto('format')
              .height(300)
              .width(300)
              .url()}
            alt={artist.name}
          />
        }
      </div>
      <ArtistName>{artist.name}</ArtistName>
    </SingleArtistStyles>
  )
}

export default SingleArtist
