import groq from 'groq'
import client from '../client'
import styled from 'styled-components'
import RiverviewLogo from '../public/RiverviewLogo.svg'
import Link from 'next/link'
import Layout from '../components/Layout'

const Index = ({ settings }) => {
  return (
    <Layout>
      <h1>This is the main page.</h1>
    </Layout>
  )
}

export async function getStaticProps() {
  const query = groq`*[_type == "siteSettings"]{
...

  }[0]`
  const settings = await client.fetch(query)

  return {
    props: { settings },
  }
}

export default Index
