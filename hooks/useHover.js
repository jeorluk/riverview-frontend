import { useState } from 'react'

export const useHover = () => {
  const [hoveredItem, setHoveredItem] = useState(0)

  return [hoveredItem, setHoveredItem]
}
