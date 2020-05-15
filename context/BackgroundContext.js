import { createContext } from 'react'

const BackgroundContext = createContext()

export const BackgroundProvider = BackgroundContext.Provider
export const BackgroundConsumer = BackgroundContext.Consumer

export default BackgroundContext
