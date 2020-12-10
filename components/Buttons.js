// import Button from '../styles/Button'
import { useContext } from 'react'
import styled from 'styled-components'
import { ModalContext } from '../context'
import SignupForm from './SignupForm'

export const Button = styled.button`
  margin: 2px;
  /* padding: 0; */
  /* font-size: 1em; */
  /* font-weight: bold; */
  border: 0;
  background: transparent;
  color: ${({ invert, theme }) =>
    invert ? theme.color.main : theme.color.lightShade};

  /* background: ${({ invert, theme }) =>
    invert ? theme.color.darkShade : theme.color.lightShade};
  border-radius: 2em; */

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
      JOIN OUR MAILING LIST
    </Button>
  )
}

export const DonateButton = (props) => {
  return (
    <form action='https://www.paypal.com/donate' method='post' target='_top'>
      <input type='hidden' name='hosted_button_id' value='42FAZHRXY2A9S' />
      <Button
        type='submit'
        {...props}
        onClick={(e) => {
          const r = confirm(
            'This will take you PayPal to process your contribution.'
          )
          if (!r) {
            e.preventDefault()
          }
        }}
      >
        SUPPORT US
      </Button>
    </form>
  )
}
