import React from 'react'
import styled from 'styled-components'

const DialogStyles = styled.div`
  display: grid;
  gap: 1rem;
  place-items: center;

  .buttonRow {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`

const DialogButton = styled.button`
  width: 100%;
  color: ${(props) => props.theme.color.lightShade};
  background: ${(props) => props.theme.color.darkAccent};
  border-radius: 5px;
  padding: 0.75rem;
`

const ConfirmationDialog = ({ confirmation }) => {
  return (
    <DialogStyles>
      <div className='text_large'>
        This will take you to PayPal to process your contribution.
      </div>
      <div className='buttonRow'>
        <DialogButton onClick={() => confirmation(true)}>
          Take me there
        </DialogButton>
        <DialogButton onClick={() => confirmation(false)}>
          Stay here
        </DialogButton>
      </div>
    </DialogStyles>
  )
}

export default ConfirmationDialog
