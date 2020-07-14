const { useState, createContext } = require('react')

const ModalContext = createContext()

const ModalContextProvider = (props) => {
  const [isVisible, setIsVisible] = useState(false)
  const [component, setComponent] = useState(null)

  return (
    <ModalContext.Provider
      value={{ isVisible, setIsVisible, component, setComponent }}
    >
      {props.children}
    </ModalContext.Provider>
  )
}

export { ModalContext, ModalContextProvider }
