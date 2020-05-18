import React, { useState } from 'react'
import styled from 'styled-components'
import Hamburger from './Hamburger'
import RiverviewLogo from '../../public/RiverviewLogo.svg'
import Link from 'next/link'
import { motion } from 'framer-motion'

const NavStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  background: ${(props) => props.theme.color.darkShade};
`

const NavList = styled(motion.ul)`
  display: grid;
  min-height: ${(props) => props.theme.navBarHeight};
  overflow: hidden;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 2em;
  color: ${(props) => props.theme.color.lightShade};

  a {
    color: ${(props) => props.theme.color.lightShade};
  }

  svg {
    padding: 2px;
    fill: ${(props) => props.theme.color.lightShade};
    height: ${(props) => props.theme.navBarHeight};
  }

  @media (min-width: ${(props) => props.theme.desktopBreak}) {
    grid-auto-flow: column;
  }
`
const MenuToggle = styled.div`
  padding: 0.5rem;
  height: 5rem;
  width: 5rem;

  @media (min-width: ${(props) => props.theme.desktopBreak}) {
    display: none;
  }
`
const variants = {
  open: { height: 'auto' },
  closed: { height: 0 },
}

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  return (
    <NavStyles>
      <NavList
        variants={variants}
        initial='closed'
        animate={isNavOpen ? 'open' : 'closed'}
      >
        <li>
          <Link href='/'>
            <a>
              <RiverviewLogo />
            </a>
          </Link>
        </li>
        <li>
          <Link href='/artists'>
            <a>Artists</a>
          </Link>
        </li>
        <li>
          <Link href='/programs'>
            <a>Programs</a>
          </Link>
        </li>
        <li>
          <Link href='/events'>
            <a>Events</a>
          </Link>
        </li>
        <li>
          <Link href='/media'>
            <a>Media</a>
          </Link>
        </li>
        <li>
          <Link href='/contact'>
            <a>Contact</a>
          </Link>
        </li>
      </NavList>
      <MenuToggle>
        <Hamburger active={isNavOpen} setActive={setIsNavOpen} />
      </MenuToggle>
    </NavStyles>
  )
}

export default Nav
