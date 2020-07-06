import { useState, createContext } from 'react'

const HoveredItemContext = createContext()

const HoveredItemContextProvider = (props) => {
  const [hoveredItem, setHoveredItem] = useState(0)

  return (
    <HoveredItemContext.Provider value={{ hoveredItem, setHoveredItem }}>
      {props.children}
    </HoveredItemContext.Provider>
  )
}

export { HoveredItemContext, HoveredItemContextProvider }
