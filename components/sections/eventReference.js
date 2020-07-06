import React from 'react'
import Event from '../Event'

const eventReference = (props) => {
  return (
    <>
      <Event {...props.event} />
    </>
  )
}

export default eventReference
