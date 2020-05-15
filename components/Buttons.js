// import Button from '../styles/Button'
import styled from 'styled-components'

const Button = styled.button`
  margin: 2px;
  /* padding: 0; */
  font-size: 1em;
  font-weight: bold;
  font-variant: small-caps;
  border: 0;
  background: transparent;
  color: ${({ invert, theme }) =>
    invert ? theme.color.main : theme.color.darkShade};

  background: ${({ invert, theme }) =>
    invert ? theme.color.darkShade : theme.color.lightShade};
  border-radius: 2em;

  &:hover {
    color: ${({ theme }) => theme.color.lightShade};
    background: ${({ theme }) => theme.color.darkAccent};
  }
`

export const SubscribeButton = (props) => {
  return (
    <Button
      {...props}
      onClick={() => {
        alert('Subscription workflow')
      }}
    >
      Join our mailing list
    </Button>
  )
}

export const DonateButton = (props) => {
  return (
    <Button
      {...props}
      onClick={() => {
        alert('Donate workflow')
      }}
    >
      Support Us
    </Button>
  )
}
