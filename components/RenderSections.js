import React from 'react'
import * as SectionComponents from './sections'

const RenderSections = ({ sections }) => {
  return (
    <>
      {sections.map((section) => {
        const SectionComponent = resolveSection(section)
        return SectionComponent ? (
          <SectionComponent {...section} key={section._key} />
        ) : (
          <div>Missing section {section._type}</div>
        )
      })}
    </>
  )
}

const resolveSection = (section) => {
  return SectionComponents[section._type]
}

export default RenderSections
