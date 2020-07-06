import BlockContent from '@sanity/block-content-to-react'
import urlFor from '../util/urlFor'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { useOnScreen } from '../hooks'
import { useRef } from 'react'

const ProgramStyles = styled(motion.div)`
  border-bottom: 1px solid ${(props) => props.theme.color.darkShade};
  min-height: 400px;
  /* width: 800px; */
  /* max-width: 80%; */
  padding: 1rem 0;
  display: grid;
  gap: 1rem;
  margin: 0 auto;
  justify-content: center;
  align-items: top;
  grid-template-columns: 1fr;

  @media (min-width: ${(props) => props.theme.desktopBreak}) {
    max-width: 100%;
    grid-template-columns: 1fr 1fr;
  }

  p {
    margin: 0;
    padding: 0 0.5rem;
  }

  img {
    box-shadow: ${(props) => props.theme.bs};
    margin: 0 auto;
    width: 100%;
    max-width: 800px;
  }
`
const variants = {
  hidden: { x: '-99%', opacity: 0 },
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
const OldProgram = ({ program, i }) => {
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

export default OldProgram
