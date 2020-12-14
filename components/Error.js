import React from 'react'
import styled from 'styled-components'

const ErrorStyles = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  line-height: 2rem;

  .icon {
    margin-right: 1rem;
    height: 2rem;
    width: 2rem;
    display: grid;
    place-content: center;
    color: white;
    background: red;
    border-radius: 50%;
  }

  .blueborder {
    border: 3px solid blue;
  }
`

const Error = ({ children }) => {
  return (
    <ErrorStyles>
      <div className='icon text_extra_large'>!</div>
      {children}
    </ErrorStyles>
  )
}

export default Error
