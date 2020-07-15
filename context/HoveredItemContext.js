import { useState, useEffect, createContext } from 'react'
import { Router } from 'next/router'

const HoveredItemContext = createContext()

const HoveredItemContextProvider = (props) => {
  const [hoveredItem, setHoveredItem] = useState(0)
  useEffect(() => {
    const handleRouteChange = (url) => {
      setHoveredItem(0)
    }

    Router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      Router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])
  return (
    <HoveredItemContext.Provider value={{ hoveredItem, setHoveredItem }}>
      {props.children}
    </HoveredItemContext.Provider>
  )
}

export { HoveredItemContext, HoveredItemContextProvider }
