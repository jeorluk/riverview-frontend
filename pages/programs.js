import Layout from '../components/Layout'

const Programs = ({ programInfo }) => {
  return (
    <Layout title='Our Programs'>
      <h1>Program Information</h1>
      <p>{programInfo}</p>
    </Layout>
  )
}

export async function getStaticProps() {
  //   const query = groq`*[_type == "siteSettings"]{
  // ...

  //   }[0]`
  //   const settings = await client.fetch(query)

  return {
    props: { programInfo: 'This information about our programs' },
  }
}

export default Programs
