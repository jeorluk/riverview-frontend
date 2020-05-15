import React, { useState } from 'react'
import styled from 'styled-components'
import Hamburger from './Hamburger'
import RiverviewLogo from '../../public/RiverviewLogo.svg'
import Link from 'next/link'
import { motion } from 'framer-motion'

const NavStyles = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 50px;
  grid-template-areas: '. logo menubutton';
  a {
    color: ${(props) => props.theme.color.lightShade};
  }

  /* width: 100%; */
  display: grid;
  grid-template-rows: ${(props) => props.theme.navBarHeight} auto;
  grid-template-columns: 50px 1fr 50px;
  grid-template-areas: '. logo menubutton';

  svg {
    fill: ${(props) => props.theme.color.lightShade};
    height: 100%;
  }
  .logo {
    grid-area: logo;
    margin: 5px auto;
  }

  @media (min-width: ${(props) => props.theme.desktopBreak}) {
    grid-template-columns: auto 1fr;
    grid-template-areas: 'logo navlinks';
  }
`
const NavLinks = styled.div`
  display: none;
  grid-area: navlinks;
  height: 100%;
  width: 100%;
  @media (min-width: ${(props) => props.theme.desktopBreak}) {
    display: block;
  }
`
const NavDrawer = styled(motion.div)`
  position: absolute;
  top: calc(
    ${(props) => props.theme.navBarHeight} +
      ${(props) => props.theme.mediaBarHeight}
  );
  left: 0;
  width: 100vw;
  background: ${(props) => props.theme.color.darkShade};
  a {
    color: ${(props) => props.theme.color.lightShade};
  }
`

const MenuToggle = styled.div`
  grid-area: menubutton;
  align-self: center;
  padding: 0.5rem;
  height: 5rem;
  width: 5rem;

  @media (min-width: ${(props) => props.theme.desktopBreak}) {
    display: none;
  }
`
const NavItems = styled(motion.ul)`
  grid-area: navlinks;
  display: grid;
  list-style: none;
  font-size: 2em;
  @media (min-width: ${(props) => props.theme.desktopBreak}) {
    grid-auto-flow: column;
  }
`
const NavList = () => {
  return (
    <NavItems>
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
    </NavItems>
  )
}

const Nav = () => {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false)

  return (
    <>
      <NavStyles>
        <Link href='/'>
          <a
            className='logo'
            alt='Riverview Logo'
            aria-label='Riverview Home'
            onClick={() => {
              setIsNavDrawerOpen(false)
            }}
          >
            <RiverviewLogo />
          </a>
        </Link>
        <NavLinks>
          <NavList />
        </NavLinks>
        <MenuToggle>
          <Hamburger active={isNavDrawerOpen} setActive={setIsNavDrawerOpen} />
        </MenuToggle>
      </NavStyles>
      {isNavDrawerOpen && (
        <NavDrawer
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
        >
          <NavList />
        </NavDrawer>
      )}
    </>
  )
}

export default Nav
