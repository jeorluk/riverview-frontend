import Layout from '../components/Layout'
import groq from 'groq'
import client from '../client'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import Program from '../components/Program'

const ProgramStyles = styled(motion.div)`
  h1 {
    /* font-size: 4rem; */
    /* font-weight: bold; */
    color: ${(props) => props.theme.color.darkAccent};
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
