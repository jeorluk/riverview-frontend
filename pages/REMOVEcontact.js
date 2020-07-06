import React from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'
import styled from 'styled-components'

const ContactStyles = styled.div``

const contact = () => {
  return (
    <Layout>
      <Head>
        <title>Riverview Early Music | Contact Us</title>
        <meta
          name='descritpion'
          content='Please send us a message below for booking, more information about upcoming events, questions or comments about our music, or just to say hello.  We’d love to hear from you!'
        />
      </Head>
      <ContactStyles>
        This will be a form that can be filled out to contact us.
      </ContactStyles>
    </Layout>
  )
}

export default contact
