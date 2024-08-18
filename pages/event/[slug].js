import { useRouter } from 'next/router'
import Head from 'next/head'
import styled from 'styled-components'
import { groq } from 'next-sanity'
import BlockContent from '@sanity/block-content-to-react'
import client from '../../client'
import urlFor from '../../util/urlFor'
import Layout from '../../components/Layout'

const EventStyles = styled.div`
  max-width: 1200px;
  width: 100%;
  padding-top: 2rem;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: row;
  min-height: 800px;
  img {
    border: 1px solid yellow;
    width: 100%;
    /* max-width: 100%; */
    height: 100%;
    object-fit: contain;
  }
  .details {
    /* margin: 3rem; */
    /* font-size: 2rem; */
  }
`

const eventPage = ({ event }) => {
  const router = useRouter()

  const {
    name,
    description = [],
    image,
    ticketLink,
    date,
    program,
    _id,
  } = event

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'America/New_York',
  }).format(new Date(event.date))

  return (
    <Layout title={name}>
      <Head>
        <meta
          name='description'
          content={`Riverview Early Music will present ${name} on ${formattedDate}`}
        />
        <title>Riverview Early Music | {name}</title>
      </Head>
      <EventStyles>
        {image && <img src={urlFor(image).width(800).url()} alt={name} />}
        {formattedDate}
        <div className='details'>
          <BlockContent blocks={description} />
        </div>
        <a href={ticketLink} target='_blank'>
          Purchase Tickets Here
        </a>
      </EventStyles>
    </Layout>
  )
}

export async function getStaticPaths() {
  const query = groq`*[_type=="event"]{"slug": slug.current}`
  const eventList = await client.fetch(query)
  const paths = eventList.map((event) => ({
    params: { slug: event.slug },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { slug = '' } = params
  const query = groq`*[_type == "event" && slug.current == $slug]{
    _id,
    name,
    description,
    image,
    ticketLink,
    date,
    program,
  }[0]`

  const event = await client.fetch(query, { slug })

  return {
    props: { event },
  }
}

export default eventPage
