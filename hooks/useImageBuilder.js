import imageUrlBuilder from '@sanity/image-url'
import client from '../client'

export const useImageBuilder = () => {
  return imageUrlBuilder(client)
}
