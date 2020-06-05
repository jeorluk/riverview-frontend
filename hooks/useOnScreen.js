import { useState, useEffect } from 'react'

export const useOnScreen = (ref, rootMargin = '50px') => {
  const [isIntersecting, setIntersecting] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting((prev) => (prev ? true : entry.isIntersecting))
      },
      { rootMargin }
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
