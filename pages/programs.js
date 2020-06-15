import Layout from '../components/Layout'
import groq from 'groq'
import client from '../client'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import Program from '../components/Program'
import Head from 'next/head'

const ProgramStyles = styled(motion.div)`
  h1 {
    text-align: center;
  }

  #intro {
    text-align: center;
  }
`

const Programs = ({ pageSettings }) => {
  const { title, intro, programList } = pageSettings
  return (
    <Layout>
      <Head>
        <title>Riverview Early Music | Programs</title>
        <meta
          name='description'
          content='These are examples of some of the programs we have done in the past. We hope to find occasions to do them again in the future.'
        />
      </Head>
      <ProgramStyles>
        <h1>{title}</h1>
        <p id='intro'>{intro}</p>
        {programList.map((program, i) => (
          <Program program={program} i={i} key={program._id} />
        ))}
      </ProgramStyles>
    </Layout>
  )
}

export async function getStaticProps() {
  const query = groq`*[_type == "programsPage"][0]{
    ...,
    programList[]->
  }`
  const pageSettings = await client.fetch(query)

  return {
    props: { pageSettings },
  }
}

export default Programs
