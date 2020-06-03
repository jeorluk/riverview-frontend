import Layout from '../components/Layout'
import BlockContent from '@sanity/block-content-to-react'
import groq from 'groq'
import urlFor from '../util/urlFor'
import client from '../client'
import styled from 'styled-components'

const ProgramStyles = styled.div`
  padding-top: 1rem;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr;

  @media (min-width: ${(props) => props.theme.desktopBreak}) {
    grid-template-columns: 1fr 1fr;
  }
  p {
    margin: 0;
  }

  img {
    width: 100%;
    max-width: 800px;
  }
`

const Programs = ({ programList }) => {
  console.log(programList)
  return (
    <Layout title='Our Programs'>
      {programList.map((program) => (
        <React.Fragment key={program._id}>
          <ProgramStyles>
            <img
              src={urlFor(program.image).width(800).url()}
              alt={`Banner image for ${program.name}`}
            />
            <BlockContent blocks={program.description} />
          </ProgramStyles>
          <hr />
        </React.Fragment>
      ))}
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
