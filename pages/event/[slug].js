import { useRouter } from 'next/router'
import Head from 'next/head'
import styled from 'styled-components'
import groq from 'groq'
import BlockContent from '@sanity/block-content-to-react'
import client from '../../client'
import urlFor from '../../util/urlFor'

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
    font-size: 2rem;
  }
`
const query = groq`*[_type == "event" && slug.current == $slug]{
  _id,
 name,
 description,
image,
ticketLink,
date,
program,
}[0]`

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
  return (
    <EventStyles>
      <Head>
        <meta name='description' content={`Event information for ${name}`} />
        <title>Riverview Early Music | {name}</title>
      </Head>
      <img src={urlFor(image).width(800).url()} alt={name} />
      {new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'America/New_York',
      }).format(new Date(event.date))}
      <div className='details'>
        <BlockContent blocks={description} />
      </div>
      <a href={ticketLink} target='_blank'>
        Purchase Tickets Here
      </a>
    </EventStyles>
  )
}

eventPage.getInitialProps = async (ctx) => {
  const { slug = '' } = ctx.query
  return {
    event: await client.fetch(query, { slug }),
  }
}

export default eventPage
