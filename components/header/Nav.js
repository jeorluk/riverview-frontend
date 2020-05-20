import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import Hamburger from './Hamburger'
import RiverviewLogo from '../../public/RiverviewLogo.svg'
import Link from 'next/link'
import { motion } from 'framer-motion'

const NavStyles = styled.nav(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr auto;
    background: ${theme.color.darkShade};
    height: ${theme.navBarHeight};
  `
)

const DesktopNav = styled.ul(
  ({ theme }) => css`
    margin: 0;
    padding: 0;
    height: ${theme.navBarHeight};
    display: grid;
    gap: 1em;
    justify-content: flex-start;
    font-size: 2em;
    list-style: none;
    grid-auto-flow: column;

    li:not(:first-child) {
      margin: auto;
      display: none;
    }
    @media (min-width: ${theme.desktopBreak}) {
      li:not(:first-child) {
        display: block;
      }
    }
    a {
      color: ${theme.color.lightShade};
    }

    svg {
      padding: 2px;
      fill: ${theme.color.lightShade};
      height: ${theme.navBarHeight};
    }
  `
)
const NavDrawer = styled(motion.ul)(
  ({ theme }) => css`
    grid-column: span 2;
    margin: 0;
    list-style: none;
    font-size: 2em;
    background: ${theme.color.darkShade};
    color: ${theme.color.lightShade};

    a {
      color: ${theme.color.lightShade};
    }
  `
)
const MenuToggle = styled.div`
  padding: 0.5rem;
  height: 5rem;
  width: 5rem;

  @media (min-width: ${(props) => props.theme.desktopBreak}) {
    display: none;
  }
`
const list = {
  // initial: {
  //   height: 0,
  // },
  open: {
    height: 'auto',
    transition: {
      // when: 'beforeChildren',
      staggerChildren: 0.07,
      // delayChildren: 0.2,
    },
  },
  closed: {
    height: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      delay: 0.2,
      // when: 'afterChildren',
    },
  },
}

const items = {
  // initial: {
  //   opacity: 0,
  //   x: '-100%',
  // },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
  closed: { opacity: 0, x: '-100%' },
  // closed: { opacity: 0, x: '-100%' },
}

const menuItems = [
  { path: '/artists', text: 'Artists' },
  { path: '/programs', text: 'Programs' },
  { path: '/events', text: 'Events' },
  { path: '/media', text: 'Media' },
  { path: '/contact', text: 'Contact' },
]

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  return (
    <NavStyles>
      <DesktopNav>
        <li>
          <Link href='/'>
            <a>
              <RiverviewLogo />
            </a>
          </Link>
        </li>
        {menuItems.map((item) => {
          return (
            <li key={`desktop${item.text}`}>
              <Link href={item.path}>
                <a>{item.text}</a>
              </Link>
            </li>
          )
        })}
      </DesktopNav>
      <MenuToggle>
        <Hamburger active={isNavOpen} setActive={setIsNavOpen} />
      </MenuToggle>

      {isNavOpen && (
        <NavDrawer
          variants={list}
          initial='closed'
          animate={isNavOpen ? 'open' : 'closed'}
        >
          {menuItems.map((item) => {
            return (
              <motion.li key={item.text} variants={items}>
                <Link href={item.path}>
                  <a>{item.text}</a>
                </Link>
              </motion.li>
            )
          })}
        </NavDrawer>
      )}
    </NavStyles>
  )
}

export default Nav
