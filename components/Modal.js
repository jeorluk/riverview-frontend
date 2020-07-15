import React, { useContext } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { ModalContext } from '../context'

const ModalStyles = styled(motion.div)`
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
const Inner = styled(motion.div)`
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: ${(props) => props.theme.bs};
  padding: 1rem;
  flex-direction: column;
  display: grid;
  grid-template-columns: 1fr;

  align-items: flex-start;
  justify-items: center;
  margin: auto;
  background: ${(props) => props.theme.color.lightShade};
  /* width: 100%; */
  max-width: ${(props) => props.theme.maxWidth};

  @media (max-width: ${(props) => props.theme.tabletBreak}) {
    min-height: 100vh;
    border-radius: 0;
  }

  #close-button {
    justify-self: right;
    border: 2px solid ${(props) => props.theme.color.darkShade};
  }
`
const variants = {
  visible: {
    scaleX: [0, 0.01, 1, 1, 1],
    scaleY: [0, 0.01, 0.01, 1, 1],
  },

  hidden: {
    scaleX: [1, 1, 1, 0.01, 0],
    scaleY: [1, 1, 0.01, 0.01, 0],
  },
}
const transition = { duration: 0.6, times: [0, 0.1, 0.5, 0.9, 1] }
const Modal = ({ children }) => {
  const { isVisible, component, setIsVisible, setComponent } = useContext(
    ModalContext
  )

  return (
    <AnimatePresence>
      {isVisible && (
        <ModalStyles
          key='modal'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
        >
          <Inner
            key='inner'
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={variants}
            transition={transition}
          >
            <button
              id='close-button'
              onClick={() => {
                setIsVisible(false)
                setComponent(null)
              }}
            >
              Close
            </button>
            {component}
          </Inner>
        </ModalStyles>
      )}
    </AnimatePresence>
  )
}

export default Modal
