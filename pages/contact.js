import { mainPageQuery } from '../queries'
import Page from '../components/Page'
import client from '../client'
import ContactForm from '../components/ContactForm'

const Contact = ({ resolvedPage }) => {
  return (
    <Page resolvedPage={resolvedPage}>
      <ContactForm />
    </Page>
  )
}

export async function getStaticProps() {
  const query = mainPageQuery
  const slug = 'contact'
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
export default Contact
