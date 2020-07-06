import React from 'react'
import Layout from './Layout'
import RenderComponents from './RenderComponents'
import RenderSidebarComponents from './RenderSidebarComponents'
import { NextSeo } from 'next-seo'

const Page = ({ resolvedPage }) => {
  const {
    content,
    sidebar1,
    sidebar2,
    leftWidth,
    rightWidth,
    mainWidth,
    ...pageSettings
  } = resolvedPage
  return (
    <Layout
      inner={<RenderComponents components={content} />}
      sidebarStart={<RenderSidebarComponents components={sidebar1} />}
      sidebarEnd={<RenderSidebarComponents components={sidebar2} />}
      columns={{ leftWidth, rightWidth, mainWidth }}
    >
      <NextSeo
        title={
          pageSettings.title
            ? `${pageSettings.title} | Riverview Early Music`
            : 'Riverview Early Music'
        }
        description={pageSettings.description}
      />
      <h1>{pageSettings.heading}</h1>
    </Layout>
  )
}

export default Page
