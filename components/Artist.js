import React, { useContext, useState } from 'react'
import BlockContent from '@sanity/block-content-to-react'

import styled, { css } from 'styled-components'
import urlFor from '../util/urlFor'
import { motion } from 'framer-motion'
import { HoveredItemContext, ModalContext } from '../context'
import ArtistDetail from './ArtistDetail'

const SingleArtistStyles = styled(motion.div)`
  box-shadow: ${(props) => props.theme.bs};
  overflow: hidden;
  position: relative;
  max-width: 100%;
  width: 300px;

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
    text-align: center;
    pointer-events: none;
    position: relative;
    z-index: 2;
    background-color: ${theme.color.darkShade};
    color: ${theme.color.lightShade};
  `
)

const Mask = styled(motion.div)`
  text-align: center;
  font-weight: bold;
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
  background: ${(props) => props.theme.color.main};
  color: ${(props) => props.theme.color.lightShade};
`
const maskVariants = {
  visible: {
    opacity: 0.9,
    y: 0,
    transition: { ease: 'easeOut', duration: 0.3 },
  },

  hidden: {
    opacity: 0,
    y: '100%',
    transition: { ease: 'easeOut', duration: 0.3 },
  },
}

const ArtistCard = styled.div`
  padding: 1rem;
  padding-top: 0;
  max-width: 100%;
`

const Artist = (props) => {
  const { _id, slug, intro, image, imageMeta, name } = props
  const { hoveredItem, setHoveredItem } = useContext(HoveredItemContext)
  const isHovered = _id === hoveredItem
  const { setIsVisible, setComponent } = useContext(ModalContext)
  return (
    <ArtistCard>
      <SingleArtistStyles
        key={_id}
        intitial={isHovered ? 'visible' : 'hidden'}
        onHoverStart={() => setHoveredItem(_id)}
        onHoverEnd={() => setHoveredItem(0)}
        onTap={() => setHoveredItem(_id)}
        animate={isHovered ? 'visible' : 'hidden'}
      >
        <Mask
          onClick={(e) => {
            setComponent(<ArtistDetail {...props} />)
            setIsVisible(true)
          }}
          variants={maskVariants}
        >
          {intro && <BlockContent blocks={intro} />}
        </Mask>

        <div className='holder'>
          {
            <img
              src={urlFor(image)
                .format('jpg')
                .auto('format')
                .height(300)
                .width(300)
                .url()}
              alt={name}
            />
          }
        </div>
        <ArtistName className='text_large'>{name}</ArtistName>
      </SingleArtistStyles>
    </ArtistCard>
  )
}

export default Artist
