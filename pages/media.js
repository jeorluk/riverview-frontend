import Layout from '../components/Layout'

const Media = ({ mediaInfo }) => {
  return (
    <Layout>
      <Head>
        <title>Riverview Early Music | Media</title>
        <meta
          name='description'
          content='Please enjoy a sampling of photos and videos of our performances.'
        />
      </Head>
      <h1>Audio and Video Clips will be here.</h1>
      <p>{mediaInfo}</p>
    </Layout>
  )
}

export async function getStaticProps() {
  //   const query = groq`*[_type == "siteSettings"]{
  // ...

  //   }[0]`
  //   const settings = await client.fetch(query)

  return {
    props: { mediaInfo: 'This is the media info' },
  }
}
export default Media
