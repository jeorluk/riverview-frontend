import React from 'react'
import styled from 'styled-components'

const HamburgerIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  padding: 0.25rem;
  /* 
  &:focus {
    outline: none;
  } */

  div {
    width: 100%;
    height: 0.5rem;
    background: ${(props) => props.theme.color.lightShade};
    border-radius: 10px;
    transition: all 0.3s linear;
    transform-origin: 1px;

    :first-child {
      transform: ${({ active }) => (active ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ active }) => (active ? '0' : '1')};
      transform: ${({ active }) =>
        active ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      /* transform-origin: 50%; */
      transform: ${({ active }) => (active ? 'rotate(-45deg) ' : 'rotate(0)')};
    }
  }
`

const Hamburger = ({ active, setActive }) => {
  return (
    <HamburgerIcon
      active={active}
      onClick={() => {
        setActive(!active)
      }}
    >
      <div></div>
      <div></div>
      <div></div>
    </HamburgerIcon>
  )
}

export default Hamburger
