import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import Hamburger from './Hamburger'
import RiverviewLogo from '../../public/RiverviewLogo.svg'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Router from 'next/router'
import Modal from '../Modal'

const NavStyles = styled.nav(
  ({ theme }) => css`
    margin: 0 auto;
    width: 100%;
    max-width: ${theme.maxWidth};
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;

    svg {
      padding: 1rem 1rem;
      fill: ${theme.color.lightShade};
      height: ${theme.mobileNavBarHeight};
      @media (min-width: ${theme.desktopBreak}) {
        padding: 1rem 0;
        height: ${theme.navBarHeight};
      }
    }
  `
)

const DesktopNav = styled.ul(
  ({ theme }) => css`
    margin: 0;
    padding-bottom: 2rem;
    display: grid;
    grid-auto-flow: column;
    align-content: flex-end;

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
    box-shadow: ${(props) => props.theme.bs};
    position: absolute;
    top: ${(props) => props.theme.mobileHeaderHeight};
    /* max-width: 100%; */
    width: 100%;
    grid-column: span 2;
    margin: 0;
    padding-left: 0.5em;
    list-style: none;
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
      staggerChildren: 0.07,
    },
  },
  closed: {
    height: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      delay: 0.2,
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
  // { path: '/contact', text: 'Contact' },
]

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  useEffect(() => {
    const handleRouteChange = (url) => {
      setIsNavOpen(false)
    }

    Router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      Router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return (
    <NavStyles>
      <Link href='/' aria-label='Link to Riverview home page'>
        <RiverviewLogo />
      </Link>
      <DesktopNav className='desktop_menu'>
        {menuItems.map((item) => {
          return (
            <li key={`desktop${item.text}`}>
              <Link href={item.path}>{item.text}</Link>
            </li>
          )
        })}
        <li>
          <a href='https://us7.list-manage.com/contact-form?u=879caf7fc9bd0b4709cafe745&form_id=68befb12c250c0859d9d91fed0b644ba'>
            Contact
          </a>
        </li>
      </DesktopNav>
      <MenuToggle>
        <Hamburger active={isNavOpen} setActive={setIsNavOpen} />
      </MenuToggle>

      {isNavOpen && (
        <NavDrawer
          className='mobile_menu'
          variants={list}
          initial='closed'
          animate={isNavOpen ? 'open' : 'closed'}
        >
          {menuItems.map((item) => {
            return (
              <motion.li key={item.text} variants={items}>
                <Link href={item.path} scroll={true}>
                  {item.text}
                </Link>
              </motion.li>
            )
          })}
          <motion.li variants={items}>
            <a href='https://us7.list-manage.com/contact-form?u=879caf7fc9bd0b4709cafe745&form_id=68befb12c250c0859d9d91fed0b644ba'>
              Contact
            </a>
          </motion.li>
        </NavDrawer>
      )}
    </NavStyles>
  )
}

export default Nav
