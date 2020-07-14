import groq from 'groq'
import client from '../client'
import { mainPageQuery } from '../queries'
import Page from '../components/Page'

const generatedPage = ({ resolvedPage }) => {
  const { content, sidebar1, sidebar2, ...pageSettings } = resolvedPage
  return <Page resolvedPage={resolvedPage} />
}

export async function getStaticPaths() {
  const query = groq`*[_type=="page"]{"slug": slug.current}`
  const pageList = await client.fetch(query)
  const paths = pageList.map((page) => ({
    params: { slug: page.slug },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const query = mainPageQuery
  const { slug = '' } = params
  const page = await client.fetch(query, { slug })
  const resolvedContent = await resolveQueries(page.content)
  const resolvedSidebar1 = await resolveQueries(page.sidebar1)
  const resolvedSidebar2 = await resolveQueries(page.sidebar2)
  const resolvedPage = {
    ...page,
    content: [...resolvedContent],
    sidebar1: [...resolvedSidebar1],
    sidebar2: [...resolvedSidebar2],
  }

  return {
    props: { resolvedPage },
  }
}

const resolveQueries = async (content) => {
  if (!content) return []
  return await Promise.all(
    content.map(async (item) => {
      if (item._type === 'savedQuery') {
        const resolvedQuery = await client.fetch(item.queryString)
        return { ...item, _type: 'list', listItems: resolvedQuery }
      }
      return item
    })
  )
}
export default generatedPage
