import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const CtaStyles = styled.button`
  margin: auto;
  border: 2px solid ${(props) => props.theme.color.darkShade};
  /* background-color: ${(props) => props.theme.color.lig}; */
  background-color: transparent;
  
  /* inset: 0; */
  a{
      color: ${(props) => props.theme.color.darkShade};
  }
`

const Cta = ({ cta }) => {
  return (
    <>
      {cta && (
        <>
          {cta.page && (
            <CtaStyles className='text_large'>
              <Link href={cta.page}>
                {cta.title}
              </Link>
            </CtaStyles>
          )}
          {cta.link && (
            <CtaStyles className='text_large'>
              <a href={cta.link}>{cta.title}</a>
            </CtaStyles>
          )}
        </>
      )}
    </>
  )
}

export default Cta
