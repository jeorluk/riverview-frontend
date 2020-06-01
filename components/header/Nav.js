import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import Hamburger from './Hamburger'
import RiverviewLogo from '../../public/RiverviewLogo.svg'
import Link from 'next/link'
import { motion } from 'framer-motion'

const NavStyles = styled.nav(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: auto auto;
    /* grid-auto-flow: row; */
    justify-content: space-between;
    background: ${theme.color.darkShade};
    /* height: ${theme.navBarHeight}; */

    svg {
      padding: 2px;
      fill: ${theme.color.lightShade};
      height: ${theme.navBarHeight};
    }

    /* @media (max-width: ${theme.desktopBreak}) {
      grid-auto-flow: column;
    } */
  `
)

const DesktopNav = styled.ul(
  ({ theme }) => css`
    margin: 0;
    padding: 0;
    display: grid;
    grid-auto-flow: column;
    font-size: 1.5em;
    list-style: none;

    li {
      text-align: center;
      padding: 0 0.5em;
      margin: auto;
    }
    li:not(:first-child) {
      border-left: 1px solid ${theme.color.lightShade};
    }

    a {
      color: ${theme.color.lightShade};
    }

    @media (max-width: ${theme.desktopBreak}) {
      display: none;
    }
  `
)
const NavDrawer = styled(motion.ul)(
  ({ theme }) => css`
    grid-column: span 2;
    margin: 0;
    padding-left: 0.5em;
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
      <Link href='/'>
        <motion.a>
          <RiverviewLogo />
        </motion.a>
      </Link>
      <DesktopNav>
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