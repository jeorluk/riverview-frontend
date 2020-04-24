import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import RiverviewLogo from '../public/RiverviewLogo.svg'
import Hamburger from './Hamburger'

const NavStyles = styled.div`
  width: 100%;
  font-size: 2rem;
`

const TopNav = styled.div`
  /* background: ${(props) => props.theme.secondaryDark}; */
  background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), 
  url(${(props) => props.theme.img}) fixed no-repeat;
  background-position-x: ${(props) => `${props.theme.offset.x * 100}%`};
  background-position-y: ${(props) => `${props.theme.offset.y * 100}%`};
  position: fixed;
  /* position: relative; */
  top: 0;
  width: 100%;
  z-index: 999;
  /* max-width: 1000px; */
  margin: auto;
  display: grid;
  grid-auto-flow: column;
  padding: 10px;
  padding-bottom: 50px;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 6vw), 0 100%);

  /* &::after {
    position: absolute;
    width: 100vw;
    height: 100%;
    content: '';
    background-color: inherit;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -5;
    transform-origin: bottom right;
    transform: skewY(-2deg);
  } */
  svg {
    fill: ${(props) => props.theme.textLight};
    height: 75px;
    @media (min-width: ${(props) => props.theme.tabletBreak}) {
      height: 100px;
    }
  }
  a {
    display: flex;
    align-items: center;
    margin: auto;
    text-transform: uppercase;
    color: ${(props) => props.theme.textLight};
  }

  .menuItem {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.tabletBreak}) {
    grid-template-columns: repeat(${(props) => props.numberOfColumns}, 1fr);
    justify-content: space-around;

    .logo {
      grid-column: ${(props) => props.centerPosition};
    }

    .menuItem {
      display: block;
    }
  }
`

const SideNav = styled.div`
  z-index: 998;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0.5rem;
  padding-top: 125px;
  background-color: ${(props) => props.theme.secondary};
  height: 100%;
  width: 100%;
  max-width: 250px;
  transition-duration: 200ms;
  transform: translate(-110%);
  ${(props) => props.active && 'transform: translate(0)'};
  box-shadow: ${(props) => props.theme.bs};

  & a {
    display: flex;
    align-items: center;
    margin: auto;
    text-transform: uppercase;
    color: ${(props) => props.theme.textLight};
    margin-top: 10px;
    border-bottom: 2px solid ${(props) => props.theme.textLight};
  }
`

const MenuToggle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 0.5rem;
  margin: auto;
  height: 5rem;
  width: 5rem;

  display: flex;
  align-items: center;
  @media (min-width: ${(props) => props.theme.tabletBreak}) {
    display: none;
  }
`

const menuItems = [
  { route: '/artists', name: 'Artists' },
  { route: '/events', name: 'Events' },
  { route: '/contact', name: 'Contact' },
  { route: '/about', name: 'About' },
]
const Nav = (props) => {
  const [active, setActive] = useState(false)
  const centerPosition = Math.ceil(menuItems.length / 2) + 1
  const numberOfColumns = Math.ceil(menuItems.length / 2) * 2 + 1

  return (
    <>
      <MenuToggle>
        <Hamburger active={active} setActive={setActive} />
      </MenuToggle>
      <TopNav centerPosition={centerPosition} numberOfColumns={numberOfColumns}>
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
        {menuItems.map((item) => (
          <Link key={`topNav${item.name}`} href={item.route}>
            <a className='menuItem'>{item.name}</a>
          </Link>
        ))}
      </TopNav>
      <SideNav active={active}>
        {menuItems.map((item) => (
          <>
            <Link key={`sideNav${item.name}`} href={item.route}>
              <a onClick={() => setActive((active) => !active)}>{item.name}</a>
            </Link>
          </>
        ))}
      </SideNav>
    </>
  )
}

export default Nav
