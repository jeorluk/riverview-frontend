import { useState, useEffect } from 'react'

export const useOnScreen = (ref, threshold = 0.05) => {
  const [isIntersecting, setIntersecting] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting((prev) => (prev ? true : entry.isIntersecting))
      },
      { threshold }
    )
    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.unobserve(ref.current)
    }
  }, [])
  return isIntersecting
}
