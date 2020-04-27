import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import RiverviewLogo from '../public/RiverviewLogo.svg'
import Hamburger from './Hamburger'

const NavStyles = styled.div`
  font-size: 2rem;
`

const TopNavBackground = styled.div`
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
    url(${(props) => props.theme.img});
  background-size: cover;
  background-position-x: ${(props) => `${props.theme.offset.x * 100}%`};
  background-position-y: ${(props) => `${props.theme.offset.y * 100}%`};
  position: fixed;
  top: 0;
  z-index: 999;
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(${(props) => props.theme.mobileHeaderHeight} - 6vw),
    0 ${(props) => props.theme.mobileHeaderHeight}
  );

  @media (min-width: ${(props) => props.theme.tabletBreak}) {
    clip-path: polygon(
      0 0,
      100% 0,
      100% calc(${(props) => props.theme.headerHeight} - 6vw),
      0 ${(props) => props.theme.headerHeight}
    );
  }
`
const TopNavMenu = styled.div`
  height: ${(props) => props.theme.headerHeight};
  width: 100%;
  padding-bottom: 3vw;
  display: grid;
  grid-auto-flow: column;

  svg {
    fill: ${(props) => props.theme.textLight};
    height: 100px;
  }

  .logo {
    margin: 5px auto;
  }

  .menuItem {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.tabletBreak}) {
    grid-template-columns: repeat(${(props) => props.numberOfColumns}, 1fr);

    justify-content: space-around;

    a {
      border: 2px solid transparent;
      transition: linear 0.2s;
      display: flex;
      align-items: center;
      margin: auto;
      text-transform: uppercase;
      color: ${(props) => props.theme.textLight};
    }

    a:hover:not(.logo),
    .currentPage {
      border-bottom: 2px solid white;
    }

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
  padding-top: ${(props) => props.theme.mobileHeaderHeight};
  @media (min-width: ${(props) => props.theme.tabletBreak}) {
    padding-top: ${(props) => props.theme.headerHeight};
  }
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
  height: 5rem;
  width: 5rem;

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
    <NavStyles>
      <MenuToggle>
        <Hamburger active={active} setActive={setActive} />
      </MenuToggle>
      <TopNavBackground>
        <TopNavMenu
          centerPosition={centerPosition}
          numberOfColumns={numberOfColumns}
        >
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
        </TopNavMenu>
      </TopNavBackground>
      <SideNav active={active}>
        {menuItems.map((item) => (
          <>
            <Link key={`sideNav${item.name}`} href={item.route}>
              <a onClick={() => setActive((active) => !active)}>{item.name}</a>
            </Link>
          </>
        ))}
      </SideNav>
    </NavStyles>
  )
}

export default Nav
