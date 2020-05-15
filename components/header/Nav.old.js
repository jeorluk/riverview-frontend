import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import RiverviewLogo from '../public/RiverviewLogo.svg'
import Hamburger from './Hamburger'
import SocialLinks from '../SocialLinks'
import { SubscribeButton, DonateButton } from '../Buttons'
import { motion } from 'framer-motion'

const menuItems = [
  { route: '/artists', name: 'Artists' },
  { route: '/programs', name: 'Programs' },
  { route: '/events', name: 'Events' },
  { route: '/media', name: 'Media' },
  { route: '/contact', name: 'Contact' },
]

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

const Nav = (props) => {
  const [active, setActive] = useState(false)

  return (
    <NavStyles>
      <MediaBar>
        <SocialLinks />
        <SubscribeButton invert />
        <DonateButton invert />
      </MediaBar>
      <NavBar>
        <div className='navBackground' />
        <Link href='/'>
          <a
            className='logo'
            alt='Riverview Logo'
            aria-label='Riverview Home'
            onClick={() => {
              setActive(false)
            }}
          >
            <RiverviewLogo />
          </a>
        </Link>
        <NavList className='navlinks' />
        {/* <NavItems>{navList}</NavItems> */}
        {/* <NavItems active={active}>
          {menuItems.map((item) => (
            <li key={`topNav${item.name}`}>
              <Link href={item.route}>
              <a className='menuItem'>{item.name}</a>
              </Link>
              </li>
          ))}
        </NavItems> */}
        <MenuToggle>
          <Hamburger active={active} setActive={setActive} />
        </MenuToggle>
      </NavBar>
    </NavStyles>
  )
}

const NavStyles = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  background: ${(props) => props.theme.color.darkShade};
`

const NavBar = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: ${(props) => props.theme.navBarHeight} auto;
  grid-template-columns: 50px 1fr 50px;
  grid-template-areas: '. logo menubutton';
  /* 'navlinks navlinks navlinks'; */

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
const NavItems = styled(motion.ul)`
  grid-area: navlinks;
  display: flex;
  flex-direction: column;
  list-style: none;

  @media (min-width: ${(props) => props.theme.desktopBreak}) {
    flex-direction: row;
  }
`

const NavDrawer = styled(motion.div)`
  grid-area: navlinks;
  margin: 0;
  background: ${(props) => props.theme.color.darkShade};
  list-style: none;

  transform-origin: 0 0;
  transform: scaleY(${({ active }) => (active ? '1' : '0')});
  transition: all 0.3s;

  display: grid;
  gap: 1em;
  align-items: center;

  a {
    border-bottom: 2px solid transparent;
    font-size: 1.5em;

    color: ${(props) => props.theme.color.lightShade};
    text-transform: uppercase;
    transition: linear 0.2s;
  }
  a:hover:not(.logo),
  .currentPage {
    border-bottom: 2px solid ${(props) => props.theme.color.lightShade};
  }

  @media (min-width: ${(props) => props.theme.desktopBreak}) {
    display: grid;
    justify-content: flex-end;
    grid-auto-flow: column;
    margin: 0 1em;
    transform: scaleY(1);
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

export default Nav
