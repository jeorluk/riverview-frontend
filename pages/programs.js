import Layout from '../components/Layout'
import BlockContent from '@sanity/block-content-to-react'
import groq from 'groq'
import urlFor from '../util/urlFor'
import client from '../client'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import Program from '../components/Program'

const ProgramStyles = styled(motion.div)`
  h1 {
    font-size: 4rem;
    font-weight: bold;
    color: ${(props) => props.theme.color.darkAccent};
    text-align: center;
  }
`

const Programs = ({ programList }) => {
  console.log(programList)
  return (
    <Layout>
      <ProgramStyles>
        <h1>Our Programs</h1>
        {programList.map((program, i) => (
          <Program program={program} i={i} key={program._id} />
          // <motion.div
          //   custom={i}
          //   initial='hidden'
          //   animate='visible'
          //   variants={variants}
          //   key={program._id}
          // >
          //   <ProgramStyles>
          //     <img
          //       src={urlFor(program.image).width(800).url()}
          //       alt={`Banner image for ${program.name}`}
          //     />
          //     <BlockContent blocks={program.description} />
          //   </ProgramStyles>
          //   <hr />
          // </motion.div>
        ))}
      </ProgramStyles>
    </Layout>
  )
}

export async function getStaticProps() {
  const query = groq`*[_type == "program"]{
...,
   "imageMeta": image.asset->,
   }`
  const programList = await client.fetch(query)

  return {
    props: { programList },
  }
}

export default Programs
