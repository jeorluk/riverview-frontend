import React from 'react'
import SanityBlockContent from '@sanity/block-content-to-react'
import client from '../client'

const SimpleBlockContent = ({ blocks }) => {
  const { projectId, dataset } = client.config()
  return (
    <>
      {blocks && (
        <SanityBlockContent
          blocks={blocks}
          projectId={projectId}
          dataset={dataset}
        />
      )}
    </>
  )
}

export default SimpleBlockContent
