import React from 'react'
import Artist from '../Artist'

const artistReference = (props) => {
  return (
    <>
      <Artist {...props.artist} />
    </>
  )
}

export default artistReference
