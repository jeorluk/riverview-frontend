import BlockContent from '@sanity/block-content-to-react'
import urlFor from '../util/urlFor'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { useOnScreen } from '../hooks'
import { useRef } from 'react'

const ProgramStyles = styled(motion.div)`
  border-bottom: 1px solid ${(props) => props.theme.color.darkShade};
  max-width: 800px;
  padding: 1rem 0;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr;
  /* background: url('/blankBackground.jpg'); */

  @media (min-width: ${(props) => props.theme.desktopBreak}) {
      max-width: 100%;
    grid-template-columns: 1fr 1fr;
  }
  h2{
      font-weight: 700;
      color: ${(props) => props.theme.color.darkAccent};
  }
  p {
    /* background: blue; */
    margin: 0;
    padding: 0 .5rem;
    /* background: ${(props) => props.theme.color.lightAccent}; */
  }

  img {
    margin: 0 auto;
    width: 100%;
    max-width: 800px;
  }
`
const variants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { ease: 'easeOut', duration: 0.4 },
  },
  //   visible: (custom) => ({
  //     x: 0,
  //     opacity: 1,
  //     transition: { delay: custom * 0.3, ease: 'easeOut', duration: 0.4 },
  //   }),
}
const Program = ({ program, i }) => {
  const ref = useRef()
  const isOnScreen = useOnScreen(ref)
  return (
    <AnimatePresence exitBeforeEnter>
      <ProgramStyles
        custom={i}
        initial='hidden'
        animate={isOnScreen ? 'visible' : 'hidden'}
        variants={variants}
        ref={ref}
      >
        <img
          src={urlFor(program.image).width(800).url()}
          alt={`Banner image for ${program.name}`}
        />
        <div>
          <h2>{program.name}</h2>
          <BlockContent blocks={program.description} />
        </div>
      </ProgramStyles>
    </AnimatePresence>
  )
}

export default Program
