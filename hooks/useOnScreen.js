import { useState, useRef, useEffect } from 'react'

export const useOnScreen = () => {
  const threshold = 0.05
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [node, setNode] = useState(null)
  const observer = useRef(null)

  useEffect(() => {
    if (!observer.current) {
      observer.current = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting((prev) => (prev ? true : entry.isIntersecting))
        },
        { threshold }
      )
    }
    const { current: currentObserver } = observer
    currentObserver.disconnect()

    if (node) currentObserver.observe(node)

    return () => currentObserver.disconnect()
  }, [node])

  return [setNode, isIntersecting]
}
