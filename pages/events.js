import React from 'react'
import groq from 'groq'
import styled from 'styled-components'
import client from '../client'
import Link from 'next/link'
import SingleEvent from '../components/SingleEvent'
import Layout from '../components/Layout'

// const query = groq`*[_type == "event"]{
//     _id,
//    name,
//    bio,
//    featured,
//    image,
//    "instruments": instruments[]->{title}
//   }[0]`

const Events = styled.div`
  padding-top: 2rem;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr;

  justify-items: center;
`

const events = ({ pageSettings, eventList }) => {
  const { title, intro } = pageSettings
  return (
    <Layout>
      <h1>{title}</h1>
      <p>{intro}</p>
      <Events>
        {eventList.map((event) => (
          <React.Fragment key={event._id}>
            <Link href='/event/[slug]' as={`/event/${event.slug.current}`}>
              <a>
                <SingleEvent event={event} />
              </a>
            </Link>
          </React.Fragment>
        ))}
      </Events>
    </Layout>
  )
}

export async function getStaticProps() {
  const pageQuery = groq`*[_type == "eventsPage"][0]`
  const eventQuery = groq`*[_type == "event"]{
    ...
  }`

  const pageSettings = await client.fetch(pageQuery)
  const eventList = await client.fetch(eventQuery)

  return {
    props: { pageSettings, eventList },
  }
}

export default events
