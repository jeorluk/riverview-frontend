import { useContext, useRef } from 'react'
import styled from 'styled-components'
import { ModalContext } from '../context'
import ConfirmationDialog from './ConfirmationDialog'
import SignupForm from './SignupForm'

export const Button = styled.button`
  margin: 2px;
  border: 0;
  background: transparent;
  color: ${({ invert, theme }) =>
    invert ? theme.color.main : theme.color.lightShade};

  &:hover {
    color: ${({ theme }) => theme.color.lightShade};
    background: ${({ theme }) => theme.color.darkAccent};
  }
`

export const StandardButton = styled.button`
  margin: 1rem;
  color: ${(props) => props.theme.color.lightShade};
  background: ${(props) => props.theme.color.darkAccent};
`

export const SubscribeButton = (props) => {
  const { setIsVisible, setComponent } = useContext(ModalContext)
  return (
    <Button
      {...props}
      onClick={() => {
        setComponent(<SignupForm />)
        setIsVisible(true)
      }}
    >
      GET UPDATES
    </Button>
  )
}

export const DonateButton = (props) => {
  const { setIsVisible, setComponent } = useContext(ModalContext)
  const formRef = useRef(null)

  return (
    <form
      action='https://www.paypal.com/donate'
      method='post'
      target='_top'
      ref={formRef}
    >
      <input type='hidden' name='hosted_button_id' value='42FAZHRXY2A9S' />
      <Button
        type='submit'
        {...props}
        onClick={(e) => {
          const confirmation = (response) => {
            setIsVisible(false)
            if (response) {
              console.log({ formRef })
              formRef.current.submit()
            }
          }

          e.preventDefault()
          setComponent(<ConfirmationDialog confirmation={confirmation} />)
          setIsVisible(true)
        }}
      >
        SUPPORT US
      </Button>
    </form>
  )
}
